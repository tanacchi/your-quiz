import { err, ok, type Result } from "neverthrow";
import { loadSearchQuizFixtures } from "../../../../shared/fixtures";
import type { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import type {
  ISearchRepository,
  SearchError,
  SearchResult,
} from "../../domain/repositories/ISearchRepository";

/**
 * モック検索リポジトリ
 *
 * D1検証システムを活用した共通フィクスチャーを使用。
 * 実際の検索エンジンやデータベースの代わりに、
 * 型安全に検証されたフィクスチャーデータを使用して検索結果を返します。
 */
export class MockSearchRepository implements ISearchRepository {
  private readonly sampleQuizzes: Array<{
    id: string;
    question: string;
    answerType: "boolean" | "free_text" | "single_choice" | "multiple_choice";
    solutionId: string;
    explanation?: string;
    status: "pending_approval" | "approved" | "rejected";
    creatorId: string;
    createdAt: string;
    approvedAt?: string;
    solution: {
      type: "boolean";
      id: string;
      value: boolean;
    };
    tags?: string[];
  }>;

  constructor() {
    // D1検証システムを活用した型安全なフィクスチャーロード
    const quizFixtures = loadSearchQuizFixtures();

    this.sampleQuizzes = quizFixtures.map((quiz) => {
      const explanation = quiz.get("explanation");
      const approvedAt = quiz.get("approvedAt");

      return {
        id: quiz.get("id"),
        question: quiz.get("question"),
        answerType: quiz.get("answerType") as
          | "boolean"
          | "free_text"
          | "single_choice"
          | "multiple_choice",
        solutionId: quiz.get("solutionId"),
        ...(explanation && { explanation }),
        status: quiz.get("status") as
          | "pending_approval"
          | "approved"
          | "rejected",
        creatorId: quiz.get("creatorId"),
        createdAt: quiz.get("createdAt"),
        ...(approvedAt && { approvedAt }),
        solution: {
          type: "boolean" as const,
          id: quiz.get("solutionId"),
          value: false, // シンプルな固定値
        },
        tags: ["programming"], // 固定タグ
      };
    });
  }

  /**
   * クイズを検索する
   *
   * @param query - 検索クエリエンティティ
   * @returns 検索結果またはエラー
   */
  async searchQuizzes(
    query: SearchQuizzesQuery,
  ): Promise<Result<SearchResult, SearchError>> {
    try {
      // サンプルデータをフィルタリング
      let filteredQuizzes = this.sampleQuizzes;

      // テキスト検索
      if (query.searchText) {
        const searchLower = query.searchText.toLowerCase();
        filteredQuizzes = filteredQuizzes.filter(
          (quiz) =>
            quiz.question.toLowerCase().includes(searchLower) ||
            quiz.explanation?.toLowerCase().includes(searchLower) ||
            quiz.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
        );
      }

      // タグフィルタ（肯定的タグ）
      if (query.tags && query.tags.length > 0) {
        filteredQuizzes = filteredQuizzes.filter((quiz) =>
          query.tags?.some((tag) => quiz.tags?.includes(tag)),
        );
      }

      // 除外タグフィルタ（否定的タグ）
      if (query.excludeTags && query.excludeTags.length > 0) {
        filteredQuizzes = filteredQuizzes.filter(
          (quiz) =>
            !query.excludeTags?.some((excludeTag) =>
              quiz.tags?.includes(excludeTag),
            ),
        );
      }

      // 回答タイプフィルタ
      if (query.answerType) {
        filteredQuizzes = filteredQuizzes.filter(
          (quiz) => quiz.answerType === query.answerType,
        );
      }

      // 作成者フィルタ
      if (query.creatorId) {
        filteredQuizzes = filteredQuizzes.filter(
          (quiz) => quiz.creatorId === query.creatorId,
        );
      }

      // 日付フィルタ
      if (query.createdAfter) {
        const afterDate = new Date(query.createdAfter);
        filteredQuizzes = filteredQuizzes.filter(
          (quiz) => new Date(quiz.createdAt) >= afterDate,
        );
      }

      if (query.createdBefore) {
        const beforeDate = new Date(query.createdBefore);
        filteredQuizzes = filteredQuizzes.filter(
          (quiz) => new Date(quiz.createdAt) <= beforeDate,
        );
      }

      // ソート
      filteredQuizzes = this.sortQuizzes(
        filteredQuizzes,
        query.sortBy,
        query.sortOrder,
      );

      // ページネーション
      const totalCount = filteredQuizzes.length;
      const paginatedQuizzes = filteredQuizzes.slice(
        query.offset,
        query.offset + query.limit,
      );

      const result: SearchResult = {
        items: paginatedQuizzes.map((quiz) => ({
          id: quiz.id,
          question: quiz.question,
          answerType: quiz.answerType,
          solutionId: quiz.solutionId,
          ...(quiz.explanation && { explanation: quiz.explanation }),
          status: quiz.status,
          creatorId: quiz.creatorId,
          createdAt: quiz.createdAt,
          ...(quiz.approvedAt && { approvedAt: quiz.approvedAt }),
          tagIds: quiz.tags || [],
        })),
        totalCount,
        hasMore: query.offset + query.limit < totalCount,
      };

      return ok(result);
    } catch (error) {
      return err({
        type: "SEARCH_EXECUTION_FAILED",
        message: "検索実行中にエラーが発生しました",
        details: error,
      });
    }
  }

  /**
   * 検索リポジトリのヘルスチェック
   */
  async isHealthy(): Promise<boolean> {
    return true;
  }

  /**
   * クイズリストをソートする
   */
  private sortQuizzes(
    quizzes: typeof this.sampleQuizzes,
    sortBy: string,
    sortOrder: "asc" | "desc",
  ): typeof this.sampleQuizzes {
    const sorted = [...quizzes];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "created_date":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          // デフォルトは作成日順 (relevance, popularity, difficulty も含む)
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return sorted;
  }
}
