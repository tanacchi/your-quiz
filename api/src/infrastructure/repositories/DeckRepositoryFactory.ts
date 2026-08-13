import type { IDeckRepository } from "../../contexts/quiz-learning/domain/repositories/IDeckRepository";
import { D1DeckRepository } from "../../contexts/quiz-learning/infrastructure/repositories/D1DeckRepository";
import { MockDeckRepository } from "../../contexts/quiz-learning/infrastructure/repositories/MockDeckRepository";
import type { CloudflareBindings } from "../../shared/types";
import { shouldUseMock } from "./QuizRepositoryFactory";

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
    return new MockDeckRepository();
  }
  return new D1DeckRepository(env.DB);
}
