import { errAsync, ok, type ResultAsync } from "neverthrow";
import { CreateFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import { NewQuizSchema } from "../../domain/entities/quiz-summary/quiz-summary-schema";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizCreationFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";

/**
 * バリデーション失敗時の QuizCreationFailedError に渡す仮のID
 *
 * id はDB（D1のAUTOINCREMENT、Mockの連番カウンタ）が採番するため、
 * リポジトリを呼ぶ前の入力検証エラーの時点ではまだ存在しない(issue #76)。
 */
const UNASSIGNED_QUIZ_ID = "(unassigned)";

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
  /** 正解データ（ID不要） */
  solution: components["schemas"]["SolutionCreate"];
  /** 解説文（オプション） */
  explanation?: string;
  /** タグ配列（オプション） */
  tags?: string[];
  /** 作成者ID（c.var.userFingerprint、ADR-0029の暫定措置） */
  creatorId: string;
  /** trueの場合、下書き（draft）として保存する（ADR-0029） */
  isDraft?: boolean;
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
    // 採番前の内容を検証する。id/solutionIdはリポジトリ（D1のAUTOINCREMENT、
    // Mockの連番カウンタ）が払い出すため、ここでは持たない(issue #76)
    const newQuizInput = {
      question: command.question,
      answerType: command.answerType,
      explanation: command.explanation,
      status: command.isDraft
        ? ("draft" as const)
        : ("pending_approval" as const),
      creatorId: command.creatorId,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const validationResult = NewQuizSchema.safeParse(newQuizInput);

    if (!validationResult.success) {
      return errAsync(
        new QuizCreationFailedError(
          UNASSIGNED_QUIZ_ID,
          validationResult.error.issues
            .map((issue) => issue.message)
            .join(", "),
        ),
      );
    }

    // リポジトリを通じて永続化（solutionはID不要のSolutionCreateのまま渡す）
    return this.quizRepository
      .create(validationResult.data, command.solution)
      .mapErr((repositoryError) => {
        // リポジトリエラーをユースケースエラーにマッピング
        if (repositoryError instanceof CreateFailedError) {
          return new QuizCreationFailedError(
            UNASSIGNED_QUIZ_ID,
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
