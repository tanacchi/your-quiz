import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { InfrastructureError } from "../../../../shared/errors";
import {
  AppError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../../../../shared/errors";
import type { UseCaseError } from "../../application/errors";
import type { QuizDomainError } from "../../domain/errors";

/**
 * エラーからHTTPステータスコードへのマッピング
 */
export const getHttpStatusFromError = (
  error: AppError,
): ContentfulStatusCode => {
  return error.code as ContentfulStatusCode;
};

/**
 * エラーからTypeSpecレスポンス形式への変換
 */
export const mapErrorToResponse = (
  error: AppError,
): {
  code: number;
  message: string;
  details?: string;
  requestId?: string;
  fieldErrors?: unknown;
} => {
  const baseResponse = error.toErrorResponse();

  // ValidationErrorの場合はfieldErrorsを含める
  if ("fieldErrors" in error && error.fieldErrors) {
    return {
      ...baseResponse,
      fieldErrors: error.fieldErrors,
    };
  }

  return baseResponse;
};

/**
 * ユースケースエラーを適切なHTTPエラーにマッピング
 */
export const mapUseCaseErrorToHttp = (error: UseCaseError): AppError => {
  // すでにAppErrorのインスタンスの場合はそのまま返す
  if (error instanceof AppError) {
    return error;
  }

  // 文字列エラーの場合（後方互換性のため）
  if (typeof error === "string") {
    // 既存の文字列エラーをマッピング
    switch (error) {
      case "ID_REQUIRED":
        return new ValidationError("ID is required", {
          id: "Path parameter 'id' is missing",
        });
      case "NOT_FOUND":
        return new NotFoundError("Quiz not found");
      default:
        return new InternalServerError(`Unhandled error: ${error}`);
    }
  }

  // その他の場合は内部サーバーエラー
  return new InternalServerError(`Unexpected error type: ${typeof error}`);
};

/**
 * コントローラーエラーハンドリングユーティリティ
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This utility class is intended to be static-only
export class ControllerErrorHandler {
  /**
   * 汎用エラーハンドリング
   */
  static handleError(
    error: AppError | UseCaseError | QuizDomainError | InfrastructureError,
  ) {
    if (error instanceof AppError) {
      return {
        statusCode: getHttpStatusFromError(error),
        response: mapErrorToResponse(error),
      };
    }

    // その他のエラー型の場合は適切にマッピング
    const mappedError = mapUseCaseErrorToHttp(error as UseCaseError);
    return {
      statusCode: getHttpStatusFromError(mappedError),
      response: mapErrorToResponse(mappedError),
    };
  }
}
