import { errAsync, ResultAsync } from "neverthrow";
import type { QuizPocketDatabase } from "./client";
import { type DbError, toDbError } from "./errors";
import { type AnswerRecord, answerRecordSchema } from "./schemas";

/**
 * 回答記録の永続化。IndexedDB の失敗（QuotaExceededError 等）は
 * TransactionFailed / QuotaExceeded として伝播する。不在は例外にしない。
 */
export class AnswerRepository {
  constructor(private readonly db: QuizPocketDatabase) {}

  /** localId をキーに upsert する。 */
  save(answer: AnswerRecord): ResultAsync<void, DbError> {
    const parsed = answerRecordSchema.safeParse(answer);
    if (!parsed.success) {
      return errAsync({
        type: "ValidationFailed",
        issues: parsed.error.issues,
      });
    }
    return ResultAsync.fromPromise(
      this.db.put("answers", parsed.data).then(() => undefined),
      toDbError,
    );
  }

  findBySessionId(
    sessionId: string,
  ): ResultAsync<ReadonlyArray<AnswerRecord>, DbError> {
    return ResultAsync.fromPromise(
      this.db.getAllFromIndex("answers", "by-sessionId", sessionId),
      toDbError,
    );
  }

  findAll(): ResultAsync<ReadonlyArray<AnswerRecord>, DbError> {
    return ResultAsync.fromPromise(this.db.getAll("answers"), toDbError);
  }

  clear(): ResultAsync<void, DbError> {
    return ResultAsync.fromPromise(this.db.clear("answers"), toDbError);
  }
}
