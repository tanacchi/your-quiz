import type { IAttemptQueryRepository } from "../../contexts/quiz-learning/domain/repositories/IAttemptQueryRepository";
import { D1AttemptQueryRepository } from "../../contexts/quiz-learning/infrastructure/repositories/D1AttemptQueryRepository";
import { MockAttemptQueryRepository } from "../../contexts/quiz-learning/infrastructure/repositories/MockAttemptQueryRepository";
import type { CloudflareBindings } from "../../shared/types";
import { shouldUseMock } from "./QuizRepositoryFactory";

/**
 * 間違い問題クエリリポジトリファクトリー
 *
 * QuizRepositoryFactoryと同じ`shouldUseMock`判定ロジックを再利用し、
 * D1/Mockを切替える。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 適切なリポジトリ実装
 */
export function createAttemptQueryRepository(
  env: CloudflareBindings,
): IAttemptQueryRepository {
  if (shouldUseMock(env)) {
    return new MockAttemptQueryRepository();
  }
  return new D1AttemptQueryRepository(env.DB);
}
