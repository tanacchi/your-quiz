import { ok, type ResultAsync } from "neverthrow";
import { CreateFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import { Quiz } from "../../domain/entities/quiz/Quiz";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizCreationFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";

/**
 * クイズ作成コマンドの型定義
 *
 * クイズ作成時に必要な入力データを定義します。
 */
export type CreateQuizCommand = {
  /** クイズの問題文 */
  question: string;
  /** 回答形式（単一選択、複数選択、自由記述など） */
  answerType: components["schemas"]["AnswerType"];
  /** 正解データ */
  solution: components["schemas"]["Solution"];
  /** 解説文（オプション） */
  explanation?: string;
  /** タグ配列（オプション） */
  tags?: string[];
  /** 作成者ID（オプション） */
  creatorId?: string;
};

/**
 * クイズ作成ユースケース
 *
 * 新しいクイズの作成処理を実行します。
 * ドメインエンティティの作成、バリデーション、永続化までを担当します。
 *
 * @example
 * ```typescript
 * const useCase = new CreateQuizUseCase(quizRepository);
 * const result = await useCase.execute({
 *   question: "TypeScriptとは何ですか？",
 *   answerType: "single_choice",
 *   solution: { type: "single_choice", correctIndex: 0, choices: ["言語", "フレームワーク"] }
 * });
 * ```
 */
export class CreateQuizUseCase {
  /**
   * CreateQuizUseCaseのコンストラクタ
   *
   * @param quizRepository - クイズの永続化を担当するリポジトリ
   */
  constructor(private readonly quizRepository: IQuizRepository) {}

  /**
   * クイズ作成を実行する
   *
   * @param command - クイズ作成に必要なデータ
   * @returns 作成されたクイズ、またはUseCaseError
   */
  execute(
    command: CreateQuizCommand,
  ): ResultAsync<components["schemas"]["Quiz"], UseCaseError> {
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
      .mapErr((repositoryError) => {
        // リポジトリエラーをユースケースエラーにマッピング
        if (repositoryError instanceof CreateFailedError) {
          return new QuizCreationFailedError(quiz.id, repositoryError.details);
        }
        return new UseCaseInternalError(
          "Failed to create quiz",
          repositoryError.message,
        );
      })
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
