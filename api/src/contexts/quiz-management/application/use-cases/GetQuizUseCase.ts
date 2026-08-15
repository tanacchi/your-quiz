import type { ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import type { UseCaseError } from "../errors";
import { mapFindErrorToUseCaseError } from "./quiz-repository-error-mapping";

type Quiz = components["schemas"]["QuizResponse"];

export class GetQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(id: string): ResultAsync<Quiz, UseCaseError> {
    // IDの検証は一旦スキップして、リポジトリに処理を委譲

    return this.quizRepository
      .findById(id)
      .mapErr((repositoryError) =>
        mapFindErrorToUseCaseError(id, repositoryError),
      );
  }
}
