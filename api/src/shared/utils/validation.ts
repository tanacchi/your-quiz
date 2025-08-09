import { err, ok, type Result, ResultAsync } from "neverthrow";
import type { z } from "zod";
import type { JsonParseError, ValidationError } from "../errors";
import {
  createJsonParseError,
  ValidationErrorFactory,
} from "../errors/factories";

/**
 * JSONの安全なパース処理
 * @param request - json()メソッドを持つリクエストオブジェクト
 * @returns ResultAsync<unknown, JsonParseError> - パース結果またはエラー
 */
export const parseJsonSafe = (request: {
  json(): Promise<unknown>;
}): ResultAsync<unknown, JsonParseError> => {
  return ResultAsync.fromPromise(request.json(), (error) => {
    if (error instanceof SyntaxError) {
      return createJsonParseError(error);
    }
    return createJsonParseError(
      error instanceof Error ? error : new Error("Unknown parsing error"),
    );
  });
};

/**
 * Zodスキーマによるバリデーション
 * @param schema - Zodスキーマ
 * @param data - バリデーション対象データ
 * @returns Result<T, ValidationError> - バリデーション結果またはエラー
 */
export const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Result<T, ValidationError> => {
  const result = schema.safeParse(data);
  if (result.success) {
    return ok(result.data);
  }

  // Zodエラーを詳細なValidationErrorに変換
  return err(ValidationErrorFactory.fromZodError(result.error));
};
