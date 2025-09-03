import { err, ok, type ResultAsync } from "neverthrow";
import { FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import { QuizNotFoundError } from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizRetrievalFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";

type Quiz = components["schemas"]["QuizResponse"];

export class GetQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(id: string): ResultAsync<Quiz, UseCaseError> {
    // IDの検証は一旦スキップして、リポジトリに処理を委譲

    return this.quizRepository
      .findById(id)
      .mapErr((repositoryError) => {
        if (repositoryError instanceof FindFailedError) {
          return new QuizRetrievalFailedError(id, repositoryError.details);
        }
        return new UseCaseInternalError(
          "Failed to get quiz",
          repositoryError.message,
        );
      })
      .andThen((quizData) =>
        quizData ? ok(quizData as Quiz) : err(new QuizNotFoundError(id)),
      );
  }
}
