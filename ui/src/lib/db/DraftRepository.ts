import { errAsync, ResultAsync } from "neverthrow";
import type { QuizPocketDatabase } from "./client";
import { type DbError, toDbError } from "./errors";
import { type DraftRecord, draftRecordSchema } from "./schemas";

/** クイズ作成の下書きの永続化。30秒ごとの自動保存で上書きされる前提。 */
export class DraftRepository {
  constructor(private readonly db: QuizPocketDatabase) {}

  /** id をキーに upsert する。 */
  save(draft: DraftRecord): ResultAsync<void, DbError> {
    const parsed = draftRecordSchema.safeParse(draft);
    if (!parsed.success) {
      return errAsync({
        type: "ValidationFailed",
        issues: parsed.error.issues,
      });
    }
    return ResultAsync.fromPromise(
      this.db.put("drafts", parsed.data).then(() => undefined),
      toDbError,
    );
  }

  findById(id: string): ResultAsync<DraftRecord | undefined, DbError> {
    return ResultAsync.fromPromise(this.db.get("drafts", id), toDbError);
  }

  findAll(): ResultAsync<ReadonlyArray<DraftRecord>, DbError> {
    return ResultAsync.fromPromise(this.db.getAll("drafts"), toDbError);
  }

  /** 存在しない id を指定しても成功する（IndexedDB の delete 仕様）。 */
  delete(id: string): ResultAsync<void, DbError> {
    return ResultAsync.fromPromise(this.db.delete("drafts", id), toDbError);
  }
}
