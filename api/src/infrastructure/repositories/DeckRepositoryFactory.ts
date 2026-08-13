import type { IDeckRepository } from "../../contexts/quiz-learning/domain/repositories/IDeckRepository";
import { D1DeckRepository } from "../../contexts/quiz-learning/infrastructure/repositories/D1DeckRepository";
import { MockDeckRepository } from "../../contexts/quiz-learning/infrastructure/repositories/MockDeckRepository";
import type { CloudflareBindings } from "../../shared/types";
import { shouldUseMock } from "./QuizRepositoryFactory";

/**
 * モック環境（テスト・開発）向けのMockDeckRepositoryシングルトン
 *
 * Cloudflare Workersはリクエストごとにハンドラーが呼ばれ、その都度
 * `createDeckRepository`が呼ばれる。`new MockDeckRepository()`を
 * 毎回生成すると、モック環境ではリクエストを跨いだデータ永続性が
 * 失われ、「作成した直後のGETが404になる」実用上の問題が生じる。
 * モジュールスコープで使い回すことでモック環境でもデータを保持する。
 */
let mockDeckRepository: MockDeckRepository | undefined;

/**
 * Deckリポジトリファクトリー
 *
 * QuizRepositoryFactoryと同じ`shouldUseMock`判定ロジックを再利用し、
 * D1/Mockを切替える。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 適切なリポジトリ実装
 */
export function createDeckRepository(env: CloudflareBindings): IDeckRepository {
  if (shouldUseMock(env)) {
    mockDeckRepository ??= new MockDeckRepository();
    return mockDeckRepository;
  }
  return new D1DeckRepository(env.DB);
}

/**
 * テスト用: MockDeckRepositoryシングルトンをリセットする
 *
 * テスト間でDeckデータが漏れないよう、`beforeEach`等で呼び出す想定。
 */
export function resetMockDeckRepository(): void {
  mockDeckRepository = undefined;
}
