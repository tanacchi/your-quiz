import { errAsync, ResultAsync } from "neverthrow";
import type { Quiz } from "@/types/quiz";
import type { QuizPocketDatabase } from "./client";
import { type DbError, toDbError } from "./errors";
import { type QuizCacheRecord, quizCacheRecordSchema } from "./schemas";

/**
 * 既定TTL: 24時間。data-architecture-detailed.md の
 * clientCache.approved_quizzes（ブラウザ側キャッシュ）に合わせる。
 * quizCache.ttl=300_000（5分）はサーバ側アプリキャッシュであり別物。
 */
export const QUIZ_CACHE_TTL_MS = 86_400_000;

/**
 * quizCacheRecordSchema の z.infer は exactOptionalPropertyTypes 下で
 * isOfflineAvailable?: boolean | undefined となり、Quiz の
 * isOfflineAvailable?: boolean より広い型になる（zod の optional 推論の
 * 既知の制約）。Quiz 型自体は変更せず、条件付きスプレッドで境界を吸収する。
 */
function toQuiz(quiz: QuizCacheRecord["quiz"]): Quiz {
  const { isOfflineAvailable, ...rest } = quiz;
  return {
    ...rest,
    ...(isOfflineAvailable != null && { isOfflineAvailable }),
  };
}

/** クイズキャッシュの永続化。期限切れレコードは get 時に破棄する。 */
export class QuizCacheRepository {
  constructor(
    private readonly db: QuizPocketDatabase,
    private readonly now: () => number = Date.now,
    private readonly ttlMs: number = QUIZ_CACHE_TTL_MS,
  ) {}

  set(quiz: Quiz): ResultAsync<void, DbError> {
    const cachedAt = this.now();
    const parsed = quizCacheRecordSchema.safeParse({
      id: quiz.id,
      quiz,
      cachedAt,
      expiresAt: cachedAt + this.ttlMs,
    });
    if (!parsed.success) {
      return errAsync({
        type: "ValidationFailed",
        issues: parsed.error.issues,
      });
    }
    return ResultAsync.fromPromise(
      this.db.put("quizCache", parsed.data).then(() => undefined),
      toDbError,
    );
  }

  /** 期限切れの場合は undefined を返し、実レコードも破棄する。 */
  get(id: string): ResultAsync<Quiz | undefined, DbError> {
    return ResultAsync.fromPromise(
      (async () => {
        const record = await this.db.get("quizCache", id);
        if (record == null) {
          return undefined;
        }
        // now >= expiresAt を期限切れとする
        if (this.now() >= record.expiresAt) {
          await this.db.delete("quizCache", id);
          return undefined;
        }
        return toQuiz(record.quiz);
      })(),
      toDbError,
    );
  }

  invalidate(id: string): ResultAsync<void, DbError> {
    return ResultAsync.fromPromise(this.db.delete("quizCache", id), toDbError);
  }

  clearAll(): ResultAsync<void, DbError> {
    return ResultAsync.fromPromise(this.db.clear("quizCache"), toDbError);
  }
}
