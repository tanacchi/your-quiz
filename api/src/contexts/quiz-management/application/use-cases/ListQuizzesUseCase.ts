import type { ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";

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
  ): ResultAsync<components["schemas"]["QuizListResponse"], string> {
    return this.quizRepository
      .findMany(query)
      .orTee((e) => console.error("Failed to list quizzes:", e));
  }
}
