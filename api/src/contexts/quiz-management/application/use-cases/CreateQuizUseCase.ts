import { err, ok, ResultAsync } from "neverthrow";
import { CreateFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import { parseQuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
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
    // QuizSummaryエンティティの作成と検証
    const quizData = {
      id: Date.now().toString(), // 簡易ID生成
      question: command.question,
      answerType: command.answerType,
      solutionId: command.solution.id,
      explanation: command.explanation,
      status: "pending_approval" as const,
      creatorId: command.creatorId || "mock-user-id",
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      tagIds: [], // デフォルト値
    };

    const quizValidationResult = parseQuizSummary(quizData);

    if (quizValidationResult.isErr()) {
      return ResultAsync.fromSafePromise(Promise.resolve()).andThen(() => {
        return err(
          new QuizCreationFailedError(
            quizData.id,
            quizValidationResult.error.issues
              .map((issue) => issue.message)
              .join(", "),
          ),
        );
      });
    }

    const quiz = quizValidationResult.value;

    // リポジトリを通じて永続化
    return this.quizRepository
      .create(quiz, command.solution)
      .mapErr((repositoryError) => {
        // リポジトリエラーをユースケースエラーにマッピング
        if (repositoryError instanceof CreateFailedError) {
          return new QuizCreationFailedError(
            quiz.get("id"),
            repositoryError.details,
          );
        }
        return new UseCaseInternalError(
          "Failed to create quiz",
          repositoryError.message,
        );
      })
      .andThen((createdQuiz) => {
        const dtoQuiz: components["schemas"]["Quiz"] = {
          id: createdQuiz.get("id"),
          question: createdQuiz.get("question"),
          answerType: createdQuiz.get("answerType"),
          solutionId: createdQuiz.get("solutionId"),
          status: createdQuiz.get("status"),
          creatorId: createdQuiz.get("creatorId"),
          createdAt: createdQuiz.get("createdAt"),
        };

        // オプショナルフィールドを個別に設定
        const explanation = createdQuiz.get("explanation");
        const approvedAt = createdQuiz.get("approvedAt");

        if (explanation) {
          dtoQuiz.explanation = explanation;
        }
        if (approvedAt) {
          dtoQuiz.approvedAt = approvedAt;
        }
        return ok(dtoQuiz);
      });
  }
}
