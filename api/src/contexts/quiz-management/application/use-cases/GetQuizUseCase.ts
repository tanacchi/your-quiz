import { err, ok, type Result } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";

export class GetQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  async execute(
    id: string,
  ): Promise<Result<components["schemas"]["QuizWithSolution"], string>> {
    if (!id) {
      return err("ID_REQUIRED");
    }

    const result = await this.quizRepository.findById(id);

    if (result.isErr()) {
      return err(result.error);
    }

    const quiz = result.value;
    if (!quiz) {
      return err("NOT_FOUND");
    }

    return ok(quiz);
  }
}
