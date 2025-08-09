import { err, ok, type Result } from "neverthrow";
import type { components } from "../../../../types/generated/api";
import { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import type {
  ISearchRepository,
  SearchError,
  SearchResult,
} from "../../domain/repositories/ISearchRepository";

/**
 * 検索リクエスト型
 */
export type SearchQuizzesRequest = {
  q?: string | undefined;
  tags?: string[] | undefined;
  difficulty?: string | undefined;
  answerType?: string | undefined;
  creatorId?: string | undefined;
  minCorrectRate?: number | undefined;
  maxCorrectRate?: number | undefined;
  createdAfter?: string | undefined;
  createdBefore?: string | undefined;
  sortBy?:
    | "relevance"
    | "created_date"
    | "popularity"
    | "difficulty"
    | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
};

/**
 * 検索ユースケースエラー
 */
export type SearchQuizzesUseCaseError =
  | SearchError
  | {
      type: "INVALID_REQUEST";
      message: string;
      details?: unknown;
    };

/**
 * クイズ検索ユースケース
 *
 * 高度な検索機能を提供するユースケースです。
 * 検索リクエストを受け取り、ドメインエンティティに変換して
 * リポジトリに検索を委譲します。
 */
export class SearchQuizzesUseCase {
  /**
   * SearchQuizzesUseCaseのコンストラクタ
   *
   * @param searchRepository - 検索リポジトリ
   */
  constructor(private readonly searchRepository: ISearchRepository) {}

  /**
   * クイズ検索を実行する
   *
   * @param request - 検索リクエスト
   * @returns 検索結果またはエラー
   */
  async execute(
    request: SearchQuizzesRequest,
  ): Promise<Result<SearchResult, SearchQuizzesUseCaseError>> {
    try {
      // リクエストをドメインエンティティに変換
      const query = this.createSearchQuery(request);

      // バリデーション
      if (!query.isValid()) {
        return err({
          type: "INVALID_REQUEST",
          message: "検索クエリが無効です",
          details: { request },
        });
      }

      // リポジトリに検索を委譲
      const result = await this.searchRepository.searchQuizzes(query);

      if (result.isErr()) {
        return err(result.error);
      }

      return ok(result.value);
    } catch (error) {
      return err({
        type: "SEARCH_EXECUTION_FAILED",
        message: "検索実行中にエラーが発生しました",
        details: error,
      });
    }
  }

  /**
   * リクエストから検索クエリエンティティを作成する
   *
   * @param request - 検索リクエスト
   * @returns 検索クエリエンティティ
   */
  private createSearchQuery(request: SearchQuizzesRequest): SearchQuizzesQuery {
    return new SearchQuizzesQuery(
      request.q,
      request.tags,
      request.difficulty,
      request.answerType as components["schemas"]["AnswerType"] | undefined,
      request.creatorId,
      request.minCorrectRate,
      request.maxCorrectRate,
      request.createdAfter,
      request.createdBefore,
      request.sortBy || "relevance",
      request.sortOrder || "desc",
      request.limit || 20,
      request.offset || 0,
    );
  }
}
