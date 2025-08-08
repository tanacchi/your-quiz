import { errAsync, okAsync, type ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";

type Quiz = components["schemas"]["QuizWithSolution"];

export class GetQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(id: string): ResultAsync<Quiz, string> {
    if (!id) {
      return errAsync("ID_REQUIRED");
    }

    return this.quizRepository
      .findById(id)
      .andThen((quiz) =>
        quiz != null
          ? okAsync<Quiz, string>(quiz)
          : errAsync<Quiz, string>("NOT_FOUND"),
      )
      .andTee((error) => console.error("Failed to get quiz:", error));
  }
}
