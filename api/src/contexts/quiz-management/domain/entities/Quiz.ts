import type { components } from "../../../../shared/types";

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
   * @returns 承認待ち状態の場合のみtrue、それ以外はfalse
   */
  public canBeUpdated(): boolean {
    return this.status === "pending_approval";
  }

  /**
   * クイズが削除可能かどうかを判定する
   *
   * @returns 拒否状態でない場合はtrue、拒否状態の場合はfalse
   * @remarks publishedステータスは未実装のため、現在はrejected以外を削除可能としている
   */
  public canBeDeleted(): boolean {
    // publishedはまだ未実装のため、rejectedでない場合は削除可能とする
    return this.status !== "rejected";
  }

  /**
   * クイズを承認状態に変更する
   *
   * @param _approverId - 承認者の識別子（現在は未使用）
   * @returns 承認状態に更新された新しいQuizインスタンス
   */
  public approve(_approverId: string): Quiz {
    return new Quiz(
      this.id,
      this.question,
      this.answerType,
      this.solutionId,
      this.explanation,
      "approved",
      this.creatorId,
      this.createdAt,
      new Date().toISOString(),
    );
  }
}
