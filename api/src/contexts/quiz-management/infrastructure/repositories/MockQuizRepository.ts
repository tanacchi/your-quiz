import { ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import { NotFoundError } from "../../../../shared/errors/base";
import type { components } from "../../../../shared/types";
import {
  CreatorId,
  QuizId,
  QuizSummary,
  SolutionId,
} from "../../domain/entities/quiz-summary/QuizSummary";
import { TagIds } from "../../domain/entities/quiz-summary/quiz-summary-schema";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
/**
 * モッククイズリポジトリ実装
 * 本番環境ではCloudflare D1に置き換える
 */
export class MockQuizRepository implements IQuizRepository {
  private readonly mockData = [
    QuizSummary.build({
      id: QuizId.parse("quiz-1"),
      question: "[Mock] What is TypeScript?",
      answerType: "single_choice",
      solutionId: SolutionId.parse("sol-1"),
      explanation: "TypeScript is a typed superset of JavaScript",
      status: "approved",
      creatorId: CreatorId.parse("user-1"),
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      tagIds: TagIds.parse(["tag-1", "tag-2"]),
    }),
    QuizSummary.build({
      id: QuizId.parse("quiz-2"),
      question: "[Mock] Is JavaScript strongly typed?",
      answerType: "boolean",
      solutionId: SolutionId.parse("sol-2"),
      status: "approved",
      creatorId: CreatorId.parse("user-2"),
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      tagIds: TagIds.parse(["tag-1"]),
    }),
  ];

  create(
    quiz: QuizSummary,
    _solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    // モックデータに追加（実際のD1では永続化）
    // Note: _solution は実際には使用しないが、インターフェースの互換性のため受け取る
    this.mockData.push(quiz);

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
        const quiz = this.mockData.find((q) => q.get("id") === id);
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
          return RepositoryErrorFactory.findFailed("Quiz", error);
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
    let filteredData = [...this.mockData];

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
    _id: string,
    _quiz: Partial<QuizSummary>,
  ): ResultAsync<QuizSummary, RepositoryError> {
    // 今回は実装せず、将来追加
    return ResultAsync.fromPromise(
      Promise.reject(new Error("NOT_IMPLEMENTED")),
      (error) => {
        console.error("Failed to update quiz:", error);
        return RepositoryErrorFactory.updateFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }

  delete(_id: string): ResultAsync<void, RepositoryError> {
    // 今回は実装せず、将来追加
    return ResultAsync.fromPromise(
      Promise.reject(new Error("NOT_IMPLEMENTED")),
      (error) => {
        console.error("Failed to delete quiz:", error);
        return RepositoryErrorFactory.deleteFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }
}
