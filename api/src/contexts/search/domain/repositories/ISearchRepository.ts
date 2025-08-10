import type { Result } from "neverthrow";
import type { components } from "../../../../types/generated/api";
import type { SearchQuizzesQuery } from "../entities/SearchQuizzesQuery";

/**
 * 検索結果タイプ
 */
export type SearchResult = components["schemas"]["QuizListResponse"];

/**
 * 検索リポジトリのドメインエラー
 */
export type SearchError = {
  type: "SEARCH_EXECUTION_FAILED" | "SEARCH_TIMEOUT" | "INVALID_SEARCH_QUERY";
  message: string;
  details?: unknown;
};

/**
 * 検索リポジトリインターフェース
 *
 * クイズの検索機能を提供するリポジトリの契約を定義します。
 * インフラストラクチャ層での実装により、様々な検索エンジンや
 * データソースに対応できます。
 */
export interface ISearchRepository {
  /**
   * クイズを検索する
   *
   * @param query - 検索クエリエンティティ
   * @returns 検索結果または検索エラー
   */
  searchQuizzes(
    query: SearchQuizzesQuery,
  ): Promise<Result<SearchResult, SearchError>>;

  /**
   * 検索リポジトリのヘルスチェック
   *
   * @returns リポジトリが正常に動作している場合はtrue
   */
  isHealthy(): Promise<boolean>;
}
