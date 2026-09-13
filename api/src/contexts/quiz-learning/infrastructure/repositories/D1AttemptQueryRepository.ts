import { ResultAsync } from "neverthrow";
import { z } from "zod";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import type { IAttemptQueryRepository } from "../../domain/repositories/IAttemptQueryRepository";

const ENTITY_NAME = "Attempt";

const wrongQuizRowSchema = z.object({
  quiz_id: z.union([z.string(), z.number()]).transform(String),
});

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toSqliteDateTime(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

/**
 * D1（`Attempt`テーブル）を用いた間違い問題クエリの実装
 *
 * Session/Answer集約自体は次issueのスコープのため、読み取り専用の
 * 最小限のクエリのみ提供する（domain/repositories/IAttemptQueryRepository.ts参照）。
 */
export class D1AttemptQueryRepository implements IAttemptQueryRepository {
  constructor(private readonly db: D1Database) {}

  findWrongQuizIds(
    creatorId: string,
    params: { sinceDays: number; maxQuizzes: number },
  ): ResultAsync<string[], RepositoryError> {
    const sinceDate = toSqliteDateTime(
      new Date(Date.now() - params.sinceDays * MS_PER_DAY),
    );

    return ResultAsync.fromPromise(
      this.db
        .prepare(`
          SELECT DISTINCT quiz_id FROM Attempt
          WHERE user_id = ? AND is_correct = 0 AND answered_at >= ?
          ORDER BY answered_at DESC
          LIMIT ?
        `)
        .bind(creatorId, sinceDate, params.maxQuizzes)
        .all(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown find error"),
        ),
    ).map((result) =>
      result.results.flatMap((row) => {
        const parsed = wrongQuizRowSchema.safeParse(row);
        return parsed.success ? [parsed.data.quiz_id] : [];
      }),
    );
  }
}
