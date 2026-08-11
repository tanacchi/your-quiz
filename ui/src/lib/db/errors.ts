import type { z } from "zod";

/** IndexedDB 永続化層で発生しうるエラーの判別可能 Union。 */
export type DbError =
  | {
      readonly type: "ValidationFailed";
      readonly issues: ReadonlyArray<z.core.$ZodIssue>;
    }
  | { readonly type: "QuotaExceeded"; readonly cause: DOMException }
  | { readonly type: "TransactionFailed"; readonly cause: unknown };

/** idb / IndexedDB が投げた値を DbError に分類する。 */
export function toDbError(cause: unknown): DbError {
  if (cause instanceof DOMException && cause.name === "QuotaExceededError") {
    return { type: "QuotaExceeded", cause };
  }
  return { type: "TransactionFailed", cause };
}
