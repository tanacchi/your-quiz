import type { Result } from "neverthrow";
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

  async execute(
    query: ListQuizzesQuery = {},
  ): Promise<Result<components["schemas"]["QuizListResponse"], string>> {
    const result = await this.quizRepository.findMany(query);

    if (result.isErr()) {
      return result;
    }

    return result;
  }
}
