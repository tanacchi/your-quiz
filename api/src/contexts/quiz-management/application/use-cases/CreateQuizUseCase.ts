import { ok, type ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import { Quiz } from "../../domain/entities/Quiz";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";

export type CreateQuizCommand = {
  question: string;
  answerType: components["schemas"]["AnswerType"];
  solution: components["schemas"]["Solution"];
  explanation?: string;
  tags?: string[];
  creatorId?: string;
};

export class CreateQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(
    command: CreateQuizCommand,
  ): ResultAsync<components["schemas"]["Quiz"], string> {
    // ドメインエンティティの作成
    const quiz = new Quiz(
      Date.now().toString(), // 簡易ID生成
      command.question,
      command.answerType,
      command.solution.id,
      command.explanation,
      "pending_approval",
      command.creatorId,
    );

    // リポジトリを通じて永続化
    return this.quizRepository
      .create(quiz, command.solution)
      .andThen((createdQuiz) => {
        const dtoQuiz: components["schemas"]["Quiz"] = {
          id: createdQuiz.id,
          question: createdQuiz.question,
          answerType: createdQuiz.answerType,
          solutionId: createdQuiz.solutionId,
          status: createdQuiz.status,
          creatorId: createdQuiz.creatorId,
          createdAt: createdQuiz.createdAt,
        };

        // オプショナルフィールドを個別に設定
        if (createdQuiz.explanation) {
          dtoQuiz.explanation = createdQuiz.explanation;
        }
        if (createdQuiz.approvedAt) {
          dtoQuiz.approvedAt = createdQuiz.approvedAt;
        }
        return ok(dtoQuiz);
      });
  }
}
