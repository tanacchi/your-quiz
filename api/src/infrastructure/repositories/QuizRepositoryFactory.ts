import type { IQuizRepository } from "../../contexts/quiz-management/domain/repositories/IQuizRepository";
import { D1QuizRepository } from "../../contexts/quiz-management/infrastructure/repositories/D1QuizRepository";
import { MockQuizRepository } from "../../contexts/quiz-management/infrastructure/repositories/MockQuizRepository";
import { getSharedMockQuizStore } from "../../contexts/quiz-management/infrastructure/repositories/MockQuizStore";
import type { CloudflareBindings } from "../../shared/types";

/**
 * クイズリポジトリファクトリー
 *
 * 環境変数に基づいて適切なリポジトリ実装を返します。
 * - 開発・テスト環境: MockQuizRepository (メモリ上のモックデータ)
 * - 本番環境: D1QuizRepository (Cloudflare D1データベース)
 *
 * @example
 * ```typescript
 * // Honoハンドラー内で使用
 * const repository = createQuizRepository(c.env);
 * ```
 */
/**
 * 環境に応じたクイズリポジトリインスタンスを作成
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 適切なリポジトリ実装
 */
export function createQuizRepository(env: CloudflareBindings): IQuizRepository {
  console.log("QuizRepositoryFactory - env:", {
    NODE_ENV: env.NODE_ENV,
    USE_MOCK_DB: env.USE_MOCK_DB,
    DB_exists: !!env.DB,
  });

  if (shouldUseMock(env)) {
    console.log("Using MockQuizRepository");
    // リクエストを跨いだ書き込み系の永続化のため共有ストアを注入する。
    // unitテストで `new MockQuizRepository()` を直接使う場合はデフォルト引数の
    // 新規ストアが使われるため、この共有化はテスト間の独立性に影響しない。
    return new MockQuizRepository(getSharedMockQuizStore());
  }

  console.log("Using D1QuizRepository, DB:", !!env.DB);
  if (!env.DB) {
    console.error("ERROR: env.DB is undefined!");
  }
  return new D1QuizRepository(env.DB);
}

/**
 * モック使用かどうかを判定
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns モック使用の場合true
 */
export function shouldUseMock(env: CloudflareBindings): boolean {
  return (
    env.NODE_ENV === "test" ||
    env.USE_MOCK_DB === "true" ||
    (env.NODE_ENV === "development" && env.USE_MOCK_DB !== "false")
  );
}
