import { err, ok, type Result, ResultAsync } from "neverthrow";
import { ZodError, type z } from "zod";
import type { JsonParseError, ValidationError } from "../errors";
import { InternalServerError } from "../errors";
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
 * Zodスキーマによるバリデーション（ValidationError版）
 * @param schema - Zodスキーマ
 * @param data - バリデーション対象データ
 * @returns Result<T, ValidationError> - バリデーション結果またはエラー
 */
export function validateWithZod<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Result<T, ValidationError>;

/**
 * Zodスキーマによるバリデーション（カスタムエラー版）
 * @param schema - Zodスキーマ
 * @param data - バリデーション対象データ
 * @param errMapper - ZodErrorからカスタムエラーへの変換関数（必須）
 * @returns Result<T, E> - バリデーション結果またはエラー
 */
export function validateWithZod<T, E>(
  schema: z.ZodSchema<T>,
  data: unknown,
  errMapper: (e: z.ZodError<T>) => E,
): Result<T, E>;

/**
 * 実装本体
 */
export function validateWithZod<T, E = ValidationError>(
  schema: z.ZodSchema<T>,
  data: unknown,
  errMapper?: (e: z.ZodError<T>) => E,
): Result<T, E | ValidationError> {
  const result = schema.safeParse(data);
  if (result.success) {
    return ok(result.data);
  }

  // errMapperが提供されていない場合（ValidationError版）
  if (errMapper === undefined) {
    return err(ValidationErrorFactory.fromZodError(result.error));
  }

  // カスタムerrMapper版
  return err(errMapper(result.error));
}

/**
 * エラーをアプリケーション層の適切なエラー型に変換
 * @param error - 変換対象のエラー
 * @param context - エラーコンテキスト（ログ用）
 * @returns ValidationError または InternalServerError
 */
export const fromZodErrorToAppError = (
  error: unknown,
  context: string = "Operation failed",
): ValidationError | InternalServerError => {
  // ZodErrorの場合はValidationErrorに変換
  if (error instanceof ZodError) {
    return ValidationErrorFactory.fromZodError(error);
  }

  // その他はInternalServerErrorとして扱う
  return new InternalServerError(
    context,
    error instanceof Error ? error.message : String(error),
  );
};
