import { type IDBPDatabase, openDB } from "idb";
import { ResultAsync } from "neverthrow";
import { type DbError, toDbError } from "./errors";
import type { QuizPocketDBSchema } from "./schema";
import { DB_NAME, DB_VERSION, upgradeQuizPocketDb } from "./schema";

export type QuizPocketDatabase = IDBPDatabase<QuizPocketDBSchema>;

/**
 * 指定名の IndexedDB を開く。テストでは一意な名前を渡して分離する。
 * ブラウザ実行前提（SSR では indexedDB が未定義のため失敗する）。
 */
export function openQuizPocketDb(
  name: string = DB_NAME,
): ResultAsync<QuizPocketDatabase, DbError> {
  return ResultAsync.fromPromise(
    openDB<QuizPocketDBSchema>(name, DB_VERSION, {
      upgrade(db) {
        upgradeQuizPocketDb(db);
      },
    }),
    toDbError,
  );
}

let sharedDb: ResultAsync<QuizPocketDatabase, DbError> | undefined;

/** アプリ全体で共有する接続を返す。ブラウザ実行時のみ呼び出すこと。 */
export function getQuizPocketDb(): ResultAsync<QuizPocketDatabase, DbError> {
  sharedDb ??= openQuizPocketDb();
  return sharedDb;
}

/** 共有接続を閉じて破棄する。未オープンの場合は何もしない。 */
export async function closeQuizPocketDb(): Promise<void> {
  const current = sharedDb;
  sharedDb = undefined;
  if (current != null) {
    const result = await current;
    if (result.isOk()) {
      result.value.close();
    }
  }
}
