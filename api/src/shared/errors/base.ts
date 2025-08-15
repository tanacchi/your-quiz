/**
 * 基底エラークラス
 * TypeSpecのエラーレスポンスに対応
 */
export abstract class AppError extends Error {
  abstract readonly code: number;
  abstract override readonly message: string;
  readonly details?: string;
  readonly requestId?: string;

  constructor(message: string, details?: string, requestId?: string) {
    super(message);
    this.name = this.constructor.name;
    // Use Object.defineProperty to assign readonly properties
    Object.defineProperty(this, "details", {
      value: details,
      enumerable: true,
    });
    Object.defineProperty(this, "requestId", {
      value: requestId,
      enumerable: true,
    });
  }

  /**
   * TypeSpecのErrorResponseフォーマットに変換
   */
  toErrorResponse(): {
    code: number;
    message: string;
    details?: string;
    requestId?: string;
  } {
    return {
      code: this.code,
      message: this.message,
      ...(this.details && { details: this.details }),
      ...(this.requestId && { requestId: this.requestId }),
    };
  }
}

/**
 * バリデーションエラー (400)
 */
export class ValidationError extends AppError {
  readonly code = 400 as const;
  override readonly message: string;
  readonly fieldErrors?: Record<string, string>;

  constructor(
    message: string = "Validation failed",
    fieldErrors?: Record<string, string>,
    details?: string,
    requestId?: string,
  ) {
    super(message, details, requestId);
    this.message = message;
    Object.defineProperty(this, "fieldErrors", {
      value: fieldErrors,
      enumerable: true,
    });
  }

  override toErrorResponse() {
    return {
      ...super.toErrorResponse(),
      ...(this.fieldErrors && { fieldErrors: this.fieldErrors }),
    };
  }
}

/**
 * 認証エラー (401)
 */
export class UnauthorizedError extends AppError {
  readonly code = 401 as const;
  readonly message = "Unauthorized access" as const;

  constructor(details?: string, requestId?: string) {
    super("Unauthorized access", details, requestId);
  }
}

/**
 * 認可エラー (403)
 */
export class ForbiddenError extends AppError {
  readonly code = 403 as const;
  readonly message = "Forbidden operation" as const;

  constructor(details?: string, requestId?: string) {
    super("Forbidden operation", details, requestId);
  }
}

/**
 * リソース未発見エラー (404)
 */
export class NotFoundError extends AppError {
  readonly code = 404 as const;
  readonly message = "Resource not found" as const;

  constructor(details?: string, requestId?: string) {
    super("Resource not found", details, requestId);
  }
}

/**
 * リソース競合エラー (409)
 */
export class ConflictError extends AppError {
  readonly code = 409 as const;
  readonly message = "Resource conflict" as const;

  constructor(details?: string, requestId?: string) {
    super("Resource conflict", details, requestId);
  }
}

/**
 * レート制限エラー (429)
 */
export class RateLimitError extends AppError {
  readonly code = 429 as const;
  readonly message = "Rate limit exceeded" as const;

  constructor(details?: string, requestId?: string) {
    super("Rate limit exceeded", details, requestId);
  }
}

/**
 * 内部サーバーエラー (500)
 */
export class InternalServerError extends AppError {
  readonly code = 500 as const;
  readonly message = "Internal server error" as const;

  constructor(
    summary: string = "Internal server error",
    details?: string,
    requestId?: string,
  ) {
    super(summary, details, requestId);
  }
}

/**
 * 未実装エラー (501)
 */
export class NotImplementedError extends AppError {
  readonly code = 501 as const;
  readonly message = "Not implemented" as const;

  constructor(operation?: string, details?: string, requestId?: string) {
    const message = operation
      ? `${operation} operation is not implemented`
      : "Not implemented";
    super(message, details, requestId);
  }
}

/**
 * TypeSpecで定義されたエラーの統合型
 */
export type TypeSpecError =
  | ValidationError
  | UnauthorizedError
  | ForbiddenError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | InternalServerError
  | NotImplementedError;
