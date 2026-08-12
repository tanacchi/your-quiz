import type { Result } from "neverthrow";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import type { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import type {
  ISearchRepository,
  SearchError,
  SearchResult,
} from "../../domain/repositories/ISearchRepository";
import {
  isSearchCountRow,
  isSearchRow,
  toQuizSummary,
} from "../mappers/search-row.schema";
import {
  buildSearchCountQuery,
  buildSearchDataQuery,
} from "./SearchQueryBuilder";

/**
 * D1例外を SearchError へ変換する
 */
function toSearchExecutionFailedError(
  error: unknown,
  message: string,
): SearchError {
  return {
    type: "SEARCH_EXECUTION_FAILED",
    message,
    details: error,
  };
}

/**
 * Cloudflare D1データベースを使用した検索リポジトリ実装
 *
 * LIKE検索によるクイズ全文検索・タグ絞り込みをD1に対して実行する。
 * FTS5を採用しない理由は
 * `docs/project/adr/0027-search-full-text-strategy.md` を参照。
 */
export class D1SearchRepository implements ISearchRepository {
  constructor(private readonly db: D1Database) {
    if (!db) {
      throw new Error("D1Database is required for D1SearchRepository");
    }
  }

  /**
   * クイズを検索する
   *
   * @param query - 検索クエリエンティティ
   * @returns 検索結果または検索エラー
   */
  async searchQuizzes(
    query: SearchQuizzesQuery,
  ): Promise<Result<SearchResult, SearchError>> {
    return this.executeSearch(query);
  }

  /**
   * 検索リポジトリのヘルスチェック
   *
   * @returns D1への疎通が正常な場合はtrue
   */
  async isHealthy(): Promise<boolean> {
    return ResultAsync.fromPromise(
      this.db.prepare("SELECT 1").first(),
      (error) => error,
    ).match(
      () => true,
      () => false,
    );
  }

  /**
   * 件数取得・データ取得の2クエリを並行実行し、結果を組み立てる
   */
  private executeSearch(
    query: SearchQuizzesQuery,
  ): ResultAsync<SearchResult, SearchError> {
    const { sql: countSql, params: countParams } = buildSearchCountQuery(query);
    const { sql: dataSql, params: dataParams } = buildSearchDataQuery(query);

    const countQuery = ResultAsync.fromPromise(
      this.db
        .prepare(countSql)
        .bind(...countParams)
        .first(),
      (error) =>
        toSearchExecutionFailedError(error, "検索件数の取得に失敗しました"),
    );

    const dataQuery = ResultAsync.fromPromise(
      this.db
        .prepare(dataSql)
        .bind(...dataParams)
        .all(),
      (error) =>
        toSearchExecutionFailedError(error, "検索結果の取得に失敗しました"),
    );

    return ResultAsync.combine([countQuery, dataQuery]).andThen(
      ([countResult, dataResult]) => {
        if (!isSearchCountRow(countResult)) {
          return errAsync(
            toSearchExecutionFailedError(
              countResult,
              "検索件数の取得結果が不正な形式です",
            ),
          );
        }

        const totalCount = countResult.total;
        // 不正な形式の行はスキップする（D1QuizSummaryMapperと同じ方針）
        const items = dataResult.results.filter(isSearchRow).map(toQuizSummary);

        return okAsync({
          items,
          totalCount,
          hasMore: query.offset + query.limit < totalCount,
        });
      },
    );
  }
}
