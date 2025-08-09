import type { ResultAsync } from "neverthrow";
import { FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizListRetrievalFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";

export type ListQuizzesQuery = {
  status?: components["schemas"]["QuizStatus"];
  creatorId?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
};

export class ListQuizzesUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(
    query: ListQuizzesQuery = {},
  ): ResultAsync<components["schemas"]["QuizListResponse"], UseCaseError> {
    return this.quizRepository
      .findMany(query)
      .mapErr((repositoryError) => {
        if (repositoryError instanceof FindFailedError) {
          return new QuizListRetrievalFailedError(
            query,
            repositoryError.details,
          );
        }
        return new UseCaseInternalError(
          "Failed to list quizzes",
          repositoryError.message,
        );
      })
      .map((result) => ({
        items: result.items.map((quiz) => ({
          id: quiz.id,
          question: quiz.question,
          answerType: quiz.answerType,
          solutionId: quiz.solutionId,
          status: quiz.status,
          creatorId: quiz.creatorId,
          createdAt: quiz.createdAt,
          ...(quiz.explanation && { explanation: quiz.explanation }),
          ...(quiz.approvedAt && { approvedAt: quiz.approvedAt }),
        })),
        totalCount: result.totalCount,
        hasMore: result.hasMore,
      }));
  }
}
