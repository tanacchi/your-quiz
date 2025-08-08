import type { Result } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { Quiz } from "../entities/Quiz";

// クイズリポジトリのインターフェース（ポート）
export interface IQuizRepository {
  /**
   * クイズを作成
   */
  create(
    quiz: Quiz,
    solution: components["schemas"]["Solution"],
  ): Promise<Result<Quiz, string>>;

  /**
   * IDでクイズを取得
   */
  findById(
    id: string,
  ): Promise<Result<components["schemas"]["QuizWithSolution"] | null, string>>;

  /**
   * クイズリストを取得
   */
  findMany(options?: {
    status?: components["schemas"]["QuizStatus"];
    creatorId?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }): Promise<
    Result<
      {
        items: components["schemas"]["QuizWithSolution"][];
        totalCount: number;
        hasMore: boolean;
      },
      string
    >
  >;

  /**
   * クイズを更新
   */
  update(id: string, quiz: Partial<Quiz>): Promise<Result<Quiz, string>>;

  /**
   * クイズを削除
   */
  delete(id: string): Promise<Result<void, string>>;
}
