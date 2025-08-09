import type { Context } from "hono";
import qs from "qs";
import type { CloudflareBindings } from "../../../../shared/types";
import { validateWithZod } from "../../../../shared/utils/validation";
import type {
  SearchQuizzesUseCase,
  SearchQuizzesUseCaseError,
} from "../../application/use-cases/SearchQuizzesUseCase";
import { SearchQuerySchema } from "../schemas/search-query.schema";

/**
 * アプリケーションコンテキスト型
 */
type AppContext = Context<{ Bindings: CloudflareBindings }>;

/**
 * 検索コントローラ
 *
 * 検索関連のHTTPリクエストを処理し、適切なユースケースに委譲します。
 * リクエストの解析、バリデーション、レスポンス生成を担当します。
 */
export class SearchController {
  /**
   * SearchControllerのコンストラクタ
   *
   * @param searchQuizzesUseCase - クイズ検索ユースケース
   */
  constructor(private readonly searchQuizzesUseCase: SearchQuizzesUseCase) {}

  /**
   * クイズ検索HTTPハンドラー
   *
   * GET /api/search/v1/quizzes エンドポイントのリクエストを処理します。
   * クエリパラメータをqsでパースし、zodで型安全にバリデーションします。
   *
   * @param c - Honoアプリケーションコンテキスト
   * @returns HTTP 200 (検索成功) またはエラーレスポンス
   */
  async searchQuizzes(c: AppContext) {
    try {
      // クエリストリングを取得してqsでパース、直接zodバリデーションに渡す
      const queryString = c.req.url.split("?")[1] || "";

      // Zodスキーマでバリデーション（qsパース結果を直接渡す）
      const validationResult = validateWithZod(
        SearchQuerySchema,
        qs.parse(queryString),
      );

      if (validationResult.isErr()) {
        return c.json(
          {
            error: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: validationResult.error,
          },
          400,
        );
      }

      const searchQuery = validationResult.value;

      // SearchQuizzesRequestに変換（既存のユースケースインターフェースに合わせる）
      const searchRequest = {
        q: searchQuery.q,
        tags: searchQuery.tags,
        difficulty: searchQuery.difficulty,
        answerType: searchQuery.answerType,
        creatorId: searchQuery.creatorId,
        minCorrectRate: searchQuery.minCorrectRate,
        maxCorrectRate: searchQuery.maxCorrectRate,
        createdAfter: searchQuery.createdAfter,
        createdBefore: searchQuery.createdBefore,
        sortBy: searchQuery.sortBy,
        sortOrder: searchQuery.sortOrder,
        limit: searchQuery.limit,
        offset: searchQuery.offset,
      };

      // ユースケース実行
      const result = await this.searchQuizzesUseCase.execute(searchRequest);

      if (result.isErr()) {
        const error = result.error;
        return this.handleError(c, error);
      }

      return c.json(result.value);
    } catch (error) {
      console.error("Unexpected error in searchQuizzes:", error);
      return c.json(
        {
          error: "INTERNAL_SERVER_ERROR",
          message: "予期しないエラーが発生しました",
        },
        500,
      );
    }
  }

  /**
   * エラーハンドリング
   *
   * @param c - Honoコンテキスト
   * @param error - ユースケースエラー
   * @returns エラーレスポンス
   */
  private handleError(c: AppContext, error: SearchQuizzesUseCaseError) {
    switch (error.type) {
      case "INVALID_REQUEST":
        return c.json(
          {
            error: "INVALID_REQUEST",
            message: error.message,
            details: error.details,
          },
          400,
        );

      case "SEARCH_TIMEOUT":
        return c.json(
          {
            error: "SEARCH_TIMEOUT",
            message: "検索がタイムアウトしました",
          },
          408,
        );

      case "INVALID_SEARCH_QUERY":
        return c.json(
          {
            error: "INVALID_SEARCH_QUERY",
            message: error.message,
          },
          400,
        );

      default:
        console.error("Search execution failed:", error);
        return c.json(
          {
            error: "SEARCH_EXECUTION_FAILED",
            message: "検索実行中にエラーが発生しました",
          },
          500,
        );
    }
  }
}
