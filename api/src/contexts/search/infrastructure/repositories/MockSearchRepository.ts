import { err, ok, type Result } from "neverthrow";
import type { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import type {
  ISearchRepository,
  SearchError,
  SearchResult,
} from "../../domain/repositories/ISearchRepository";

/**
 * モック検索リポジトリ
 *
 * 検索機能の基本実装を提供するモックリポジトリです。
 * 実際の検索エンジンやデータベースの代わりに、
 * メモリ上のサンプルデータを使用して検索結果を返します。
 */
export class MockSearchRepository implements ISearchRepository {
  private readonly sampleQuizzes = [
    {
      id: "quiz-1",
      question: "JavaScriptで配列をソートするメソッドは？",
      answerType: "single_choice" as const,
      solutionId: "solution-1",
      explanation: "Array.prototype.sort()メソッドを使用します",
      status: "approved" as const,
      creatorId: "user-1",
      createdAt: new Date("2024-01-15").toISOString(),
      approvedAt: new Date("2024-01-16").toISOString(),
      solution: {
        type: "single_choice" as const,
        id: "solution-1",
        correctChoiceId: "choice-1",
        choices: [
          {
            id: "choice-1",
            solutionId: "solution-1",
            text: "sort()",
            orderIndex: 0,
          },
          {
            id: "choice-2",
            solutionId: "solution-1",
            text: "order()",
            orderIndex: 1,
          },
          {
            id: "choice-3",
            solutionId: "solution-1",
            text: "arrange()",
            orderIndex: 2,
          },
        ],
      },
      tags: ["javascript", "array", "programming"],
    },
    {
      id: "quiz-2",
      question: "Pythonでリストを逆順にするメソッドは？",
      answerType: "single_choice" as const,
      solutionId: "solution-2",
      explanation: "reverse()メソッドまたはスライシング[::-1]を使用します",
      status: "approved" as const,
      creatorId: "user-2",
      createdAt: new Date("2024-01-20").toISOString(),
      approvedAt: new Date("2024-01-21").toISOString(),
      solution: {
        type: "single_choice" as const,
        id: "solution-2",
        correctChoiceId: "choice-4",
        choices: [
          {
            id: "choice-4",
            solutionId: "solution-2",
            text: "reverse()",
            orderIndex: 0,
          },
          {
            id: "choice-5",
            solutionId: "solution-2",
            text: "invert()",
            orderIndex: 1,
          },
          {
            id: "choice-6",
            solutionId: "solution-2",
            text: "backward()",
            orderIndex: 2,
          },
        ],
      },
      tags: ["python", "list", "programming"],
    },
    {
      id: "quiz-3",
      question: "TypeScriptの型安全性の利点は？",
      answerType: "multiple_choice" as const,
      solutionId: "solution-3",
      explanation: "コンパイル時のエラー検出とIDE支援が主な利点です",
      status: "approved" as const,
      creatorId: "user-1",
      createdAt: new Date("2024-02-01").toISOString(),
      approvedAt: new Date("2024-02-02").toISOString(),
      solution: {
        type: "multiple_choice" as const,
        id: "solution-3",
        correctChoiceIds: ["choice-7", "choice-8"],
        minCorrectAnswers: 2,
        choices: [
          {
            id: "choice-7",
            solutionId: "solution-3",
            text: "コンパイル時エラー検出",
            orderIndex: 0,
          },
          {
            id: "choice-8",
            solutionId: "solution-3",
            text: "IDE支援の向上",
            orderIndex: 1,
          },
          {
            id: "choice-9",
            solutionId: "solution-3",
            text: "実行速度の向上",
            orderIndex: 2,
          },
        ],
      },
      tags: ["typescript", "type-safety", "programming"],
    },
  ];

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
          explanation: quiz.explanation,
          status: quiz.status,
          creatorId: quiz.creatorId,
          createdAt: quiz.createdAt,
          approvedAt: quiz.approvedAt,
          solution: quiz.solution,
          tags: quiz.tags,
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
