import type { components } from "../../../../types/generated/api";

/**
 * クイズ検索クエリエンティティ
 *
 * 検索条件を表現するドメインエンティティです。
 * フィルタリング、ソート、ページネーション条件を含みます。
 */
export class SearchQuizzesQuery {
  /**
   * SearchQuizzesQueryのコンストラクタ
   *
   * @param searchText - 検索テキスト（オプション）
   * @param tags - タグフィルタ（オプション）
   * @param excludeTags - 除外タグフィルタ（オプション）
   * @param difficulty - 難易度フィルタ（オプション）
   * @param answerType - 回答タイプフィルタ（オプション）
   * @param creatorId - 作成者IDフィルタ（オプション）
   * @param minCorrectRate - 最小正答率フィルタ（オプション）
   * @param maxCorrectRate - 最大正答率フィルタ（オプション）
   * @param createdAfter - 作成日以降フィルタ（オプション）
   * @param createdBefore - 作成日以前フィルタ（オプション）
   * @param sortBy - ソート基準（デフォルト: relevance）
   * @param sortOrder - ソート順序（デフォルト: asc）
   * @param limit - 取得件数制限（デフォルト: 20）
   * @param offset - オフセット（デフォルト: 0）
   */
  constructor(
    public readonly searchText?: string,
    public readonly tags?: string[],
    public readonly excludeTags?: string[],
    public readonly difficulty?: string,
    public readonly answerType?: components["schemas"]["AnswerType"],
    public readonly creatorId?: string,
    public readonly minCorrectRate?: number,
    public readonly maxCorrectRate?: number,
    public readonly createdAfter?: string,
    public readonly createdBefore?: string,
    public readonly sortBy:
      | "relevance"
      | "created_date"
      | "popularity"
      | "difficulty" = "relevance",
    public readonly sortOrder: "asc" | "desc" = "asc",
    public readonly limit: number = 20,
    public readonly offset: number = 0,
  ) {}

  /**
   * 検索条件が有効かどうかを判定する
   *
   * @returns 検索条件が有効な場合はtrue、そうでなければfalse
   */
  public isValid(): boolean {
    // 基本的なバリデーション
    if (this.limit <= 0 || this.limit > 100) {
      return false;
    }

    if (this.offset < 0) {
      return false;
    }

    if (
      this.minCorrectRate !== undefined &&
      (this.minCorrectRate < 0 || this.minCorrectRate > 1)
    ) {
      return false;
    }

    if (
      this.maxCorrectRate !== undefined &&
      (this.maxCorrectRate < 0 || this.maxCorrectRate > 1)
    ) {
      return false;
    }

    if (
      this.minCorrectRate !== undefined &&
      this.maxCorrectRate !== undefined &&
      this.minCorrectRate > this.maxCorrectRate
    ) {
      return false;
    }

    return true;
  }

  /**
   * 検索条件に基づく検索の複雑度を計算する
   *
   * @returns 検索複雑度スコア（0-1の範囲）
   */
  public getComplexityScore(): number {
    let score = 0;

    if (this.searchText) score += 0.3;
    if (this.tags && this.tags.length > 0) score += 0.15;
    if (this.excludeTags && this.excludeTags.length > 0) score += 0.15;
    if (this.difficulty) score += 0.1;
    if (this.answerType) score += 0.1;
    if (this.creatorId) score += 0.1;
    if (this.minCorrectRate !== undefined || this.maxCorrectRate !== undefined)
      score += 0.1;
    if (this.createdAfter || this.createdBefore) score += 0.1;

    return Math.min(score, 1.0);
  }

  /**
   * ページネーション情報を含むクエリ情報を取得する
   */
  public getPaginationInfo(): {
    limit: number;
    offset: number;
    page: number;
  } {
    return {
      limit: this.limit,
      offset: this.offset,
      page: Math.floor(this.offset / this.limit) + 1,
    };
  }
}
