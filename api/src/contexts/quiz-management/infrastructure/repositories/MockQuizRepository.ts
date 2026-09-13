import { ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import { NotFoundError } from "../../../../shared/errors/base";
import type { components } from "../../../../shared/types";
import type {
  QuizSummary,
  QuizSummaryData,
} from "../../domain/entities/quiz-summary/QuizSummary";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { MockQuizStore } from "./MockQuizStore";
/**
 * モッククイズリポジトリ実装
 * D1検証システムを活用した共通フィクスチャーを使用
 * 本番環境ではCloudflare D1に置き換える
 *
 * データストアは {@link MockQuizStore} に分離している。デフォルト引数
 * （`new MockQuizStore()`）は呼び出す度に新規ストアを作るため、unit テストでは
 * 従来どおりテスト間で状態が独立する。`QuizRepositoryFactory` は
 * `getSharedMockQuizStore()` を明示的に注入することで、BDD テストなど
 * リクエストを跨いだ永続化が必要な場面にのみ共有ストアを使う。
 */
export class MockQuizRepository implements IQuizRepository {
  constructor(private readonly store: MockQuizStore = new MockQuizStore()) {}

  create(
    quiz: QuizSummary,
    _solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    // モックデータに追加（実際のD1では永続化）
    // Note: _solution は実際には使用しないが、インターフェースの互換性のため受け取る
    this.store.add(quiz);

    return ResultAsync.fromPromise(
      new Promise((resolve) => resolve(quiz)),
      (error) => {
        console.error("Failed to create quiz:", error);
        return RepositoryErrorFactory.createFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }

  findById(
    id: string,
  ): ResultAsync<components["schemas"]["QuizResponse"], RepositoryError> {
    return ResultAsync.fromPromise(
      new Promise((resolve, reject) => {
        const quiz = this.store.findById(id);
        if (quiz) {
          // QuizSummaryからQuizResponse形式に変換（モック用）
          const quizResponse: components["schemas"]["QuizResponse"] = {
            id: quiz.get("id"),
            question: quiz.get("question"),
            answerType: quiz.get("answerType"),
            solutionId: quiz.get("solutionId"),
            status: quiz.get("status"),
            creatorId: quiz.get("creatorId"),
            createdAt: quiz.get("createdAt"),
            // モック用の最小限のsolution
            solution: this.createMockSolution(
              quiz.get("answerType"),
              quiz.get("solutionId"),
            ),
          };

          // オプショナルフィールドを追加
          const explanation = quiz.get("explanation");
          const approvedAt = quiz.get("approvedAt");
          if (explanation) {
            quizResponse.explanation = explanation;
          }
          if (approvedAt) {
            quizResponse.approvedAt = approvedAt;
          }

          resolve(quizResponse);
        } else {
          reject(new NotFoundError(`Quiz not found: ${id}`));
        }
      }),
      (error) => {
        console.error("Failed to find quiz by ID:", error);
        if (error instanceof NotFoundError) {
          // NotFoundError.messageは固定文言のため、詳細はdetailsから引き継ぐ
          return RepositoryErrorFactory.findFailed(
            "Quiz",
            new Error(error.details ?? error.message),
          );
        }
        return RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }

  /**
   * モック用の最小限のSolutionオブジェクトを作成
   */
  private createMockSolution(
    answerType: string,
    solutionId: string,
  ): components["schemas"]["Solution"] {
    switch (answerType) {
      case "boolean":
        return {
          type: "boolean",
          id: solutionId,
          value: false,
        };
      case "free_text":
        return {
          type: "free_text",
          id: solutionId,
          correctAnswer: "mock answer",
          matchingStrategy: "exact",
          caseSensitive: false,
        };
      case "single_choice":
        return {
          type: "single_choice",
          id: solutionId,
          choices: [
            {
              id: "choice-1",
              solutionId,
              text: "Mock choice",
              orderIndex: 1,
              isCorrect: true,
            },
          ],
        };
      case "multiple_choice":
        return {
          type: "multiple_choice",
          id: solutionId,
          minCorrectAnswers: 1,
          choices: [
            {
              id: "choice-1",
              solutionId,
              text: "Mock choice",
              orderIndex: 1,
              isCorrect: true,
            },
          ],
        };
      default:
        throw new Error(`Unsupported answer type: ${answerType}`);
    }
  }

  findMany(
    filter: {
      status?: components["schemas"]["QuizStatus"][];
      creatorId?: string;
      ids?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): ResultAsync<
    {
      items: QuizSummary[];
      totalCount: number;
      hasMore: boolean;
    },
    RepositoryError
  > {
    let filteredData = [...this.store.list()];

    // フィルタリング
    if (filter.status && filter.status.length > 0) {
      filteredData = filteredData.filter((quiz) =>
        filter.status?.includes(quiz.get("status")),
      );
    }
    if (filter.creatorId) {
      filteredData = filteredData.filter(
        (quiz) => quiz.get("creatorId") === filter.creatorId,
      );
    }
    if (filter.ids && filter.ids.length > 0) {
      filteredData = filteredData.filter((quiz) =>
        filter.ids?.includes(quiz.get("id")),
      );
    }

    const totalCount = filteredData.length;
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;

    const items = filteredData.slice(offset, offset + limit);
    const hasMore = offset + limit < totalCount;

    return ResultAsync.fromPromise(
      Promise.resolve({
        items,
        totalCount,
        hasMore,
      }),
      (error) => {
        console.error("Failed to find quizzes:", error);
        return RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }

  update(
    id: string,
    patch: Partial<QuizSummaryData>,
  ): ResultAsync<QuizSummary, RepositoryError> {
    return ResultAsync.fromPromise(
      new Promise<QuizSummary>((resolve, reject) => {
        const existing = this.store.findById(id);
        if (!existing) {
          reject(new NotFoundError(`Quiz not found: ${id}`));
          return;
        }

        const updateResult = existing.with(patch);
        if (updateResult.isErr()) {
          reject(
            new Error(
              updateResult.error.issues
                .map((issue) => issue.message)
                .join(", "),
            ),
          );
          return;
        }

        const updated = updateResult.value;
        this.store.replace(id, updated);
        resolve(updated);
      }),
      (error) => {
        console.error("Failed to update quiz:", error);
        if (error instanceof NotFoundError) {
          // NotFoundError.messageは固定文言のため、詳細はdetailsから引き継ぐ
          return RepositoryErrorFactory.updateFailed(
            "Quiz",
            new Error(error.details ?? error.message),
          );
        }
        return RepositoryErrorFactory.updateFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }

  delete(id: string): ResultAsync<void, RepositoryError> {
    return ResultAsync.fromPromise(
      new Promise<void>((resolve, reject) => {
        const removed = this.store.remove(id);
        if (!removed) {
          reject(new NotFoundError(`Quiz not found: ${id}`));
          return;
        }
        resolve();
      }),
      (error) => {
        console.error("Failed to delete quiz:", error);
        if (error instanceof NotFoundError) {
          // NotFoundError.messageは固定文言のため、詳細はdetailsから引き継ぐ
          return RepositoryErrorFactory.deleteFailed(
            "Quiz",
            new Error(error.details ?? error.message),
          );
        }
        return RepositoryErrorFactory.deleteFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }
}
