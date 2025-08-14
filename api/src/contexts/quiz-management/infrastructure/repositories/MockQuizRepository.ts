import { ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import { NotFoundError } from "../../../../shared/errors/base";
import type { components } from "../../../../shared/types";
import type { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
/**
 * モッククイズリポジトリ実装
 * 本番環境ではCloudflare D1に置き換える
 */
export class MockQuizRepository implements IQuizRepository {
  private readonly mockData: components["schemas"]["QuizWithSolution"][] = [
    {
      id: "1",
      question: "What is TypeScript?",
      answerType: "single_choice",
      solutionId: "sol-1",
      explanation: "TypeScript is a typed superset of JavaScript",
      status: "approved",
      creatorId: "user-1",
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      solution: {
        type: "single_choice",
        id: "sol-1",
        choices: [
          {
            id: "choice-1",
            solutionId: "sol-1",
            text: "A typed superset",
            orderIndex: 1,
            isCorrect: true,
          },
          {
            id: "choice-2",
            solutionId: "sol-1",
            text: "A framework",
            orderIndex: 2,
            isCorrect: false,
          },
        ],
      },
    },
    {
      id: "2",
      question: "Is JavaScript strongly typed?",
      answerType: "boolean",
      solutionId: "sol-2",
      status: "approved",
      creatorId: "user-2",
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      solution: {
        type: "boolean",
        id: "sol-2",
        value: false,
      },
    },
  ];

  create(
    quiz: QuizSummary,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    // モックデータに追加（実際のD1では永続化）
    const explanation = quiz.get("explanation");
    const approvedAt = quiz.get("approvedAt");

    const newQuizWithSolution: components["schemas"]["QuizWithSolution"] = {
      id: quiz.get("id"),
      question: quiz.get("question"),
      answerType: quiz.get("answerType"),
      solutionId: quiz.get("solutionId"),
      status: quiz.get("status"),
      creatorId: quiz.get("creatorId"),
      createdAt: quiz.get("createdAt"),
      solution,
    };

    // オプションフィールドを条件付きで追加
    if (explanation) {
      newQuizWithSolution.explanation = explanation;
    }
    if (approvedAt) {
      newQuizWithSolution.approvedAt = approvedAt;
    }

    this.mockData.push(newQuizWithSolution);
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
  ): ResultAsync<components["schemas"]["QuizWithSolution"], RepositoryError> {
    return ResultAsync.fromPromise(
      new Promise((resolve, reject) => {
        const quiz = this.mockData.find((q) => q.id === id);
        if (quiz) {
          resolve(quiz);
        } else {
          reject(new NotFoundError(`Quiz not found: ${id}`));
        }
      }),
      (error) => {
        console.error("Failed to find quiz by ID:", error);
        if (error instanceof NotFoundError) {
          return error;
        }
        return RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : undefined,
        );
      },
    );
  }

  findMany(
    options: {
      status?: components["schemas"]["QuizStatus"];
      creatorId?: string;
      ids?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): ResultAsync<
    {
      items: components["schemas"]["QuizWithSolution"][];
      totalCount: number;
      hasMore: boolean;
    },
    RepositoryError
  > {
    let filteredData = [...this.mockData];

    // フィルタリング
    if (options.status) {
      filteredData = filteredData.filter(
        (quiz) => quiz.status === options.status,
      );
    }
    if (options.creatorId) {
      filteredData = filteredData.filter(
        (quiz) => quiz.creatorId === options.creatorId,
      );
    }
    if (options.ids && options.ids.length > 0) {
      filteredData = filteredData.filter((quiz) =>
        options.ids?.includes(quiz.id),
      );
    }

    const totalCount = filteredData.length;
    const limit = options.limit || 10;
    const offset = options.offset || 0;

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
