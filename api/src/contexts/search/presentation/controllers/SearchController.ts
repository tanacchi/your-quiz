import type { Context } from "hono";
import type { CloudflareBindings } from "../../../../shared/types";
import type {
  SearchQuizzesUseCase,
  SearchQuizzesUseCaseError,
} from "../../application/use-cases/SearchQuizzesUseCase";

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
   * クエリパラメータから検索条件を取得し、検索ユースケースに委譲します。
   *
   * @param c - Honoアプリケーションコンテキスト
   * @returns HTTP 200 (検索成功) またはエラーレスポンス
   */
  async searchQuizzes(c: AppContext) {
    try {
      // クエリパラメータから検索条件を取得
      const query = c.req.query();

      // 検索リクエストを構築
      const searchRequest = {
        q: query["q"],
        tags: query["tags"]
          ? Array.isArray(query["tags"])
            ? query["tags"]
            : [query["tags"]]
          : undefined,
        difficulty: query["difficulty"],
        answerType: query["answerType"],
        creatorId: query["creatorId"],
        minCorrectRate: query["minCorrectRate"]
          ? parseFloat(query["minCorrectRate"])
          : undefined,
        maxCorrectRate: query["maxCorrectRate"]
          ? parseFloat(query["maxCorrectRate"])
          : undefined,
        createdAfter: query["createdAfter"],
        createdBefore: query["createdBefore"],
        sortBy: query["sortBy"] as
          | "relevance"
          | "created_date"
          | "popularity"
          | "difficulty"
          | undefined,
        sortOrder: query["sortOrder"] as "asc" | "desc" | undefined,
        limit: query["limit"] ? parseInt(query["limit"], 10) : undefined,
        offset: query["offset"] ? parseInt(query["offset"], 10) : undefined,
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
