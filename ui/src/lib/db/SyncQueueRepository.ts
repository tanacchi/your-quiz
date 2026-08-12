import { errAsync, ResultAsync } from "neverthrow";
import type { QuizPocketDatabase } from "./client";
import { type DbError, toDbError } from "./errors";
import { type SyncQueueItem, syncQueueItemSchema } from "./schemas";

/**
 * 未同期キューの永続化。syncQueue ストアは out-of-line + autoIncrement
 * のため、キー昇順＝挿入順＝FIFO が index 無しで成立する。
 */
export class SyncQueueRepository {
  constructor(private readonly db: QuizPocketDatabase) {}

  enqueue(item: SyncQueueItem): ResultAsync<void, DbError> {
    const parsed = syncQueueItemSchema.safeParse(item);
    if (!parsed.success) {
      return errAsync({
        type: "ValidationFailed",
        issues: parsed.error.issues,
      });
    }
    return ResultAsync.fromPromise(
      this.db.add("syncQueue", parsed.data).then(() => undefined),
      toDbError,
    );
  }

  /**
   * 最も古い1件を取り出して削除する。読み取りと削除を単一の readwrite
   * トランザクションで行うため、同時呼び出しで同じ要素が二重に返ることはない。
   * IDB トランザクションは IDB リクエスト無しでマイクロタスクキューが空に
   * なると自動コミットするため、この関数内では IDB 操作以外を await しない。
   */
  dequeue(): ResultAsync<SyncQueueItem | undefined, DbError> {
    return ResultAsync.fromPromise(
      (async () => {
        const tx = this.db.transaction("syncQueue", "readwrite");
        const cursor = await tx.store.openCursor();
        if (cursor == null) {
          await tx.done;
          return undefined;
        }
        const item = cursor.value;
        await cursor.delete();
        await tx.done;
        return item;
      })(),
      toDbError,
    );
  }

  /** 先頭要素を削除せずに返す。 */
  peek(): ResultAsync<SyncQueueItem | undefined, DbError> {
    return ResultAsync.fromPromise(
      this.db.getAll("syncQueue", undefined, 1).then(([first]) => first),
      toDbError,
    );
  }

  size(): ResultAsync<number, DbError> {
    return ResultAsync.fromPromise(this.db.count("syncQueue"), toDbError);
  }
}
