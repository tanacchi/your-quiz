import { err, ok, type Result, ResultAsync } from "neverthrow";
import type { z } from "zod";

/**
 * JSONの安全なパース処理
 * @param request - json()メソッドを持つリクエストオブジェクト
 * @returns Result<unknown, string> - パース結果またはエラー
 */
export const parseJsonSafe = (request: {
  json(): Promise<unknown>;
}): ResultAsync<unknown, string> => {
  return ResultAsync.fromPromise(request.json(), (error) => {
    if (error instanceof SyntaxError) {
      return "INVALID_JSON";
    }
    return "UNKNOWN_ERROR";
  });
};

/**
 * Zodスキーマによるバリデーション
 * @param schema - Zodスキーマ
 * @param data - バリデーション対象データ
 * @returns Result<T, string> - バリデーション結果またはエラー
 */
export const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Result<T, string> => {
  const result = schema.safeParse(data);
  return result.success ? ok(result.data) : err("VALIDATION_ERROR");
};
