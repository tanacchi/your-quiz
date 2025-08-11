import type { IQuizRepository } from "../../contexts/quiz-management/domain/repositories/IQuizRepository";
import { D1QuizRepository } from "../../contexts/quiz-management/infrastructure/repositories/D1QuizRepository";
import { MockQuizRepository } from "../../contexts/quiz-management/infrastructure/repositories/MockQuizRepository";
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
  // テスト環境または明示的にモック使用が指定されている場合
  if (env.NODE_ENV === "test" || env.USE_MOCK_DB === "true") {
    return new MockQuizRepository();
  }

  // 開発環境でもデフォルトはモック使用（D1セットアップ不要）
  if (env.NODE_ENV === "development") {
    // USE_MOCK_DBが明示的にfalseの場合のみD1使用
    if (env.USE_MOCK_DB === "false") {
      return new D1QuizRepository(env.DB);
    }
    return new MockQuizRepository();
  }

  // 本番環境では必ずD1使用
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
