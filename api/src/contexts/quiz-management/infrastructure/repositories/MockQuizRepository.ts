import { err, ok, type Result } from "neverthrow";
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

  async create(
    quiz: Quiz,
    solution: components["schemas"]["Solution"],
  ): Promise<Result<Quiz, string>> {
    try {
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
      return ok(quiz);
    } catch (_error) {
      return err("CREATE_FAILED");
    }
  }

  async findById(
    id: string,
  ): Promise<Result<components["schemas"]["QuizWithSolution"] | null, string>> {
    try {
      const quiz = this.mockData.find((q) => q.id === id) || null;
      return ok(quiz);
    } catch (_error) {
      return err("FIND_BY_ID_FAILED");
    }
  }

  async findMany(
    options: {
      status?: components["schemas"]["QuizStatus"];
      creatorId?: string;
      tags?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): Promise<
    Result<
      {
        items: components["schemas"]["QuizWithSolution"][];
        totalCount: number;
        hasMore: boolean;
      },
      string
    >
  > {
    try {
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

      return ok({
        items,
        totalCount,
        hasMore,
      });
    } catch (_error) {
      return err("FIND_MANY_FAILED");
    }
  }

  async update(
    _id: string,
    _quiz: Partial<Quiz>,
  ): Promise<Result<Quiz, string>> {
    // 今回は実装せず、将来追加
    return err("NOT_IMPLEMENTED");
  }

  async delete(_id: string): Promise<Result<void, string>> {
    // 今回は実装せず、将来追加
    return err("NOT_IMPLEMENTED");
  }
}
