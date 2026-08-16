import type { Result } from "neverthrow";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import type { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import type {
  ISearchRepository,
  SearchError,
  SearchResult,
} from "../../domain/repositories/ISearchRepository";
import {
  parseSearchRows,
  searchCountRowSchema,
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
 * count/dataクエリが同時に失敗した場合の複数エラーを1つのSearchErrorへ統合する
 *
 * `ResultAsync.combine` は最初に見つかったエラーだけを返し、他方のエラーを
 * 破棄してしまう（neverthrowの仕様）。両クエリが異なる原因で同時に失敗した
 * 場合に片方の原因が完全に失われるのを防ぐため、`combineWithAllErrors` で
 * 収集した全エラーをここで1つにまとめる。
 */
function mergeSearchErrors(errors: SearchError[]): SearchError {
  return {
    type: "SEARCH_EXECUTION_FAILED",
    message: errors.map((error) => error.message).join(" / "),
    details: errors.map((error) => error.details),
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
    return this.executeSearch(query).mapErr((error) => {
      console.error("Failed to search quizzes:", error);
      return error;
    });
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
      (error) => {
        console.error("D1SearchRepository health check failed:", error);
        return false;
      },
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

    return ResultAsync.combineWithAllErrors([countQuery, dataQuery])
      .mapErr(mergeSearchErrors)
      .andThen(([countResult, dataResult]) => {
        // safeParse().data（zodのtransform適用済みの値）を直接使う。
        // `isSearchCountRow` のような真偽値のみを返す型ガードで
        // narrowing しても実行時の値はtransform前の生データのままであり、
        // total が文字列で返るケースを取りこぼすため使わない。
        const parsedCount = searchCountRowSchema.safeParse(countResult);
        if (!parsedCount.success) {
          return errAsync(
            toSearchExecutionFailedError(
              countResult,
              "検索件数の取得結果が不正な形式です",
            ),
          );
        }

        const totalCount = parsedCount.data.total;
        // 不正な形式の行はスキップする（D1QuizRepository.executeFindManyと
        // 同じ方針）。totalCountは別クエリ由来のため、行が破棄された場合
        // items.length と totalCount が乖離しうる（既知の制約。
        // D1QuizRepository側にも同じ制約がある）。診断のためログに残す。
        const { validRows, invalidRows } = parseSearchRows(dataResult.results);
        if (invalidRows.length > 0) {
          console.error("Dropped invalid search rows:", invalidRows);
        }
        const items = validRows.map(toQuizSummary);

        return okAsync({
          items,
          totalCount,
          hasMore: query.offset + query.limit < totalCount,
        });
      });
  }
}
