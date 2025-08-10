import type { ZodError } from "zod";
import {
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
  ValidationError,
} from "./base";
import {
  CreateFailedError,
  DeleteFailedError,
  FindFailedError,
  JsonParseError,
  NotImplementedError,
  UpdateFailedError,
} from "./infrastructure";

/**
 * エラーファクトリー関数群
 * 一貫したエラー作成のためのユーティリティ
 */

/**
 * Zodバリデーションエラーから ValidationError を作成
 */
export const createValidationError = (
  zodError: ZodError,
  requestId?: string,
): ValidationError => {
  const fieldErrors: Record<string, string> = {};
  let primaryMessage = "Validation failed";

  zodError.issues.forEach((error) => {
    const path = error.path.join(".");
    fieldErrors[path] = error.message;

    // Use the first custom error message as the primary message if it's more specific
    if (error.code === "custom" && primaryMessage === "Validation failed") {
      primaryMessage = error.message;
    }
  });

  // If we have specific solution/field error messages, prioritize them
  const solutionErrors = Object.values(fieldErrors).filter(
    (msg) =>
      msg.includes("Solution type") ||
      msg.includes("answerType") ||
      msg.includes("does not match"),
  );

  if (solutionErrors.length > 0 && solutionErrors[0]) {
    primaryMessage = solutionErrors[0];
  }

  return new ValidationError(
    primaryMessage,
    fieldErrors,
    JSON.stringify(zodError.issues),
    requestId,
  );
};

export const ValidationErrorFactory = {
  fromZodError: (zodError: ZodError, requestId?: string) =>
    createValidationError(zodError, requestId),
};

/**
 * 単一フィールドのバリデーションエラーを作成
 */
export const createFieldValidationError = (
  field: string,
  message: string,
  requestId?: string,
): ValidationError => {
  return new ValidationError(
    "Validation failed",
    { [field]: message },
    `Field '${field}' validation failed: ${message}`,
    requestId,
  );
};

/**
 * リソース未発見エラーを作成
 */
export const createNotFoundError = (
  resourceType: string,
  resourceId: string,
  requestId?: string,
): NotFoundError => {
  return new NotFoundError(
    `${resourceType} with ID '${resourceId}' not found`,
    requestId,
  );
};

/**
 * 認可エラーを作成（作成者のみ操作可能）
 */
export const createCreatorOnlyError = (
  operation: string,
  requestId?: string,
): ForbiddenError => {
  return new ForbiddenError(
    `${operation} operation is only allowed for the creator`,
    requestId,
  );
};

/**
 * 管理者権限エラーを作成
 */
export const createAdminOnlyError = (
  operation: string,
  requestId?: string,
): ForbiddenError => {
  return new ForbiddenError(
    `${operation} operation requires admin privileges`,
    requestId,
  );
};

/**
 * ステート遷移エラーを作成
 */
export const createStateConflictError = (
  currentState: string,
  requiredState: string,
  requestId?: string,
): ConflictError => {
  return new ConflictError(
    `Invalid state transition. Current: ${currentState}, Required: ${requiredState}`,
    requestId,
  );
};

/**
 * リポジトリエラーファクトリー
 */
export const RepositoryErrorFactory = {
  createFailed: (entity: string, cause?: Error, requestId?: string) =>
    new CreateFailedError(entity, cause?.message, requestId),

  findFailed: (entity: string, cause?: Error, requestId?: string) =>
    new FindFailedError(entity, cause?.message, requestId),

  updateFailed: (entity: string, cause?: Error, requestId?: string) =>
    new UpdateFailedError(entity, cause?.message, requestId),

  deleteFailed: (entity: string, cause?: Error, requestId?: string) =>
    new DeleteFailedError(entity, cause?.message, requestId),

  notImplemented: (operation: string, requestId?: string) =>
    new NotImplementedError(operation, requestId),
};

/**
 * JSON解析エラーを作成
 */
export const createJsonParseError = (
  cause?: Error,
  requestId?: string,
): JsonParseError => {
  return new JsonParseError(cause?.message, requestId);
};

/**
 * 汎用内部サーバーエラーを作成
 */
export const createInternalServerError = (
  details?: string,
  requestId?: string,
): InternalServerError => {
  return new InternalServerError(details, requestId);
};

/**
 * 認証エラーを作成
 */
export const createUnauthorizedError = (
  reason?: string,
  requestId?: string,
): UnauthorizedError => {
  return new UnauthorizedError(reason, requestId);
};

/**
 * レート制限エラーを作成
 */
export const createRateLimitError = (
  limit: number,
  windowMs: number,
  requestId?: string,
): RateLimitError => {
  return new RateLimitError(
    `Rate limit of ${limit} requests per ${windowMs}ms exceeded`,
    requestId,
  );
};
