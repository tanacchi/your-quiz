import { okAsync, type ResultAsync } from "neverthrow";
import type { RepositoryError } from "../../../../shared/errors";
import type { IAttemptQueryRepository } from "../../domain/repositories/IAttemptQueryRepository";

/**
 * テスト・開発環境向けの間違い問題クエリのin-memoryモック実装
 *
 * Attempt集約自体は未実装（Session/Answerは次issueのスコープ）のため、
 * デフォルトでは常に空を返す。テストでは`seed()`で疑似データを登録できる。
 */
export class MockAttemptQueryRepository implements IAttemptQueryRepository {
  private readonly store = new Map<string, string[]>();

  seed(creatorId: string, quizIds: string[]): void {
    this.store.set(creatorId, quizIds);
  }

  findWrongQuizIds(
    creatorId: string,
    params: { sinceDays: number; maxQuizzes: number },
  ): ResultAsync<string[], RepositoryError> {
    const quizIds = this.store.get(creatorId) ?? [];
    return okAsync(quizIds.slice(0, params.maxQuizzes));
  }
}
