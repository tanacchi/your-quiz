import type { components } from "../../../../shared/types";
import { ok, err, type Result } from "neverthrow";

/**
 * クイズドメインエンティティ
 *
 * クイズの基本情報と状態を管理するドメインエンティティです。
 * クイズの作成、承認、更新、削除に関するビジネスルールを実装します。
 *
 * @example
 * ```typescript
 * const quiz = new Quiz(
 *   "quiz-123",
 *   "TypeScriptとは何ですか？",
 *   "single_choice",
 *   "solution-456"
 * );
 * ```
 */
export class Quiz {
  /**
   * クイズエンティティのコンストラクタ
   *
   * @param id - クイズの一意識別子
   * @param question - クイズの問題文
   * @param answerType - 回答タイプ（単一選択、複数選択、自由記述など）
   * @param solutionId - 正解データの識別子
   * @param explanation - 解説文（オプション）
   * @param status - クイズの承認状態（デフォルト: "pending_approval"）
   * @param creatorId - 作成者の識別子（デフォルト: "mock-user-id"）
   * @param createdAt - 作成日時（デフォルト: 現在時刻のISO文字列）
   * @param approvedAt - 承認日時（オプション）
   */
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly answerType: components["schemas"]["AnswerType"],
    public readonly solutionId: string,
    public readonly explanation?: string,
    public readonly status: components["schemas"]["QuizStatus"] = "pending_approval",
    public readonly creatorId: string = "mock-user-id",
    public readonly createdAt: string = new Date().toISOString(),
    public readonly approvedAt?: string,
  ) {}

  /**
   * クイズが更新可能かどうかを判定する
   *
   * @returns draft または pending_approval 状態の場合true、それ以外false
   */
  public canBeUpdated(): boolean {
    return this.status === "pending_approval";
  }

  /**
   * クイズが削除可能かどうかを判定する
   *
   * @returns draft、pending_approval、rejected 状態の場合true、approved状態の場合false
   */
  public canBeDeleted(): boolean {
    return this.status !== "approved";
  }

  /**
   * クイズを承認状態に変更する
   *
   * @param approvedAt - 承認日時
   * @returns 成功時は承認状態に更新されたQuizインスタンス、失敗時はエラー
   */
  public approve(approvedAt: string): Result<Quiz, Error> {
    if (this.status !== "pending_approval") {
      return err(new Error(`Quiz with status ${this.status} cannot be approved`));
    }

    return ok(new Quiz(
      this.id,
      this.question,
      this.answerType,
      this.solutionId,
      this.explanation,
      "approved",
      this.creatorId,
      this.createdAt,
      approvedAt,
    ));
  }
}
