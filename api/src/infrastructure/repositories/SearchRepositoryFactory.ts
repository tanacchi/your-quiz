import type { ISearchRepository } from "../../contexts/search/domain/repositories/ISearchRepository";
import { D1SearchRepository } from "../../contexts/search/infrastructure/repositories/D1SearchRepository";
import { MockSearchRepository } from "../../contexts/search/infrastructure/repositories/MockSearchRepository";
import type { CloudflareBindings } from "../../shared/types";
import { shouldUseMock } from "./QuizRepositoryFactory";

/**
 * 検索リポジトリファクトリー
 *
 * 環境変数に基づいて適切なリポジトリ実装を返します。
 * - 開発・テスト環境: MockSearchRepository (フィクスチャーベースのモックデータ)
 * - 本番環境: D1SearchRepository (Cloudflare D1データベース)
 *
 * モック判定は QuizRepositoryFactory の shouldUseMock を再利用する
 * （NODE_ENV / USE_MOCK_DB によるDI切り替えポリシーはコンテキスト横断の
 * 関心事であり、判定ロジックを二重に持たないため）。
 *
 * @example
 * ```typescript
 * // Honoハンドラー内で使用
 * const repository = createSearchRepository(c.env);
 * ```
 */
export function createSearchRepository(
  env: CloudflareBindings,
): ISearchRepository {
  if (shouldUseMock(env)) {
    return new MockSearchRepository();
  }

  return new D1SearchRepository(env.DB);
}
