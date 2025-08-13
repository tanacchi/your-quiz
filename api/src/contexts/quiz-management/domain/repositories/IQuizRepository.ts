import type { ResultAsync } from "neverthrow";
import type { RepositoryError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { Quiz } from "../entities/quiz/Quiz";

/**
 * クイズリポジトリインターフェース
 *
 * クイズエンティティの永続化に関する操作を定義します。
 * 実装クラスはこのインターフェースに従ってデータアクセス層を実装する必要があります。
 *
 * @remarks
 * 全ての操作はneverthrowのResultAsync型を使用して、型安全なエラーハンドリングを提供します。
 */
export interface IQuizRepository {
  /**
   * クイズを作成する
   *
   * @param quiz - 作成するクイズエンティティ
   * @param solution - クイズの正解データ
   * @returns 作成されたクイズエンティティ、またはRepositoryError
   */
  create(
    quiz: Quiz,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<Quiz, RepositoryError>;

  /**
   * IDでクイズを取得する
   *
   * @param id - 取得するクイズのID
   * @returns クイズ（正解込み）、または null（見つからない場合）、またはRepositoryError
   */
  findById(
    id: string,
  ): ResultAsync<
    components["schemas"]["QuizWithSolution"] | null,
    RepositoryError
  >;

  /**
   * 条件に基づいてクイズリストを取得する
   *
   * @param options - 検索オプション
   * @param options.status - フィルターするクイズステータス
   * @param options.creatorId - フィルターする作成者ID
   * @param options.tags - フィルターするタグ配列
   * @param options.limit - 取得件数の上限
   * @param options.offset - 取得開始位置のオフセット
   * @returns ページング情報付きのクイズリスト、またはRepositoryError
   */
  findMany(options?: {
    status?: components["schemas"]["QuizStatus"];
    creatorId?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }): ResultAsync<
    {
      items: components["schemas"]["QuizWithSolution"][];
      totalCount: number;
      hasMore: boolean;
    },
    RepositoryError
  >;

  /**
   * クイズを更新する
   *
   * @param id - 更新するクイズのID
   * @param quiz - 更新するフィールドの部分オブジェクト
   * @returns 更新されたクイズエンティティ、またはRepositoryError
   */
  update(id: string, quiz: Partial<Quiz>): ResultAsync<Quiz, RepositoryError>;

  /**
   * クイズを削除する
   *
   * @param id - 削除するクイズのID
   * @returns 成功時はvoid、失敗時はRepositoryError
   */
  delete(id: string): ResultAsync<void, RepositoryError>;
}
