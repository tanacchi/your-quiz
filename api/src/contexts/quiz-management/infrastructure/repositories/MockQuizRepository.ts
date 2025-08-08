import { ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { Quiz } from "../../domain/entities/Quiz";
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
        correctChoiceId: "choice-1",
        choices: [
          {
            id: "choice-1",
            solutionId: "sol-1",
            text: "A typed superset",
            orderIndex: 1,
          },
          {
            id: "choice-2",
            solutionId: "sol-1",
            text: "A framework",
            orderIndex: 2,
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
    quiz: Quiz,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<Quiz, string> {
    // モックデータに追加（実際のD1では永続化）
    const newQuizWithSolution: components["schemas"]["QuizWithSolution"] = {
      id: quiz.id,
      question: quiz.question,
      answerType: quiz.answerType,
      solutionId: quiz.solutionId,
      ...(quiz.explanation && { explanation: quiz.explanation }),
      status: quiz.status,
      creatorId: quiz.creatorId,
      createdAt: quiz.createdAt,
      ...(quiz.approvedAt && { approvedAt: quiz.approvedAt }),
      solution,
    };

    this.mockData.push(newQuizWithSolution);
    return ResultAsync.fromPromise(
      new Promise((resolve) => resolve(quiz)),
      (error) => {
        console.error("Failed to create quiz:", error);
        return "CREATE_FAILED";
      },
    );
  }

  findById(
    id: string,
  ): ResultAsync<components["schemas"]["QuizWithSolution"] | null, string> {
    return ResultAsync.fromPromise(
      new Promise((resolve) => {
        const quiz = this.mockData.find((q) => q.id === id) || null;
        resolve(quiz);
      }),
      (error) => {
        console.error("Failed to find quiz by ID:", error);
        return "FIND_BY_ID_FAILED";
      },
    );
  }

  findMany(
    options: {
      status?: components["schemas"]["QuizStatus"];
      creatorId?: string;
      tags?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): ResultAsync<
    {
      items: components["schemas"]["QuizWithSolution"][];
      totalCount: number;
      hasMore: boolean;
    },
    string
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
        return "FIND_MANY_FAILED";
      },
    );
  }

  update(_id: string, _quiz: Partial<Quiz>): ResultAsync<Quiz, string> {
    // 今回は実装せず、将来追加
    return ResultAsync.fromPromise(
      Promise.reject("NOT_IMPLEMENTED"),
      (error) => {
        console.error("Failed to update quiz:", error);
        return "UPDATE_FAILED";
      },
    );
  }

  delete(_id: string): ResultAsync<void, string> {
    // 今回は実装せず、将来追加
    return ResultAsync.fromPromise(
      Promise.reject("NOT_IMPLEMENTED"),
      (error) => {
        console.error("Failed to delete quiz:", error);
        return "DELETE_FAILED";
      },
    );
  }
}
