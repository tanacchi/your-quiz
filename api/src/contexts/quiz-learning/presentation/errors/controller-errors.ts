import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { AppError } from "../../../../shared/errors";

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

  if ("fieldErrors" in error && error.fieldErrors) {
    return {
      ...baseResponse,
      fieldErrors: error.fieldErrors,
    };
  }

  return baseResponse;
};

/**
 * Deckコントローラーエラーハンドリングユーティリティ
 *
 * `DeckUseCaseError`は全て`AppError`のサブクラスのunion型のため、
 * quiz-managementの`ControllerErrorHandler`のような文字列エラー
 * マッピングは不要。`parseJsonSafe`/`validateWithZod`が返す
 * `JsonParseError`/`ValidationError`も`AppError`のサブクラスであり、
 * 同じハンドラで扱える。
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This utility class is intended to be static-only
export class DeckControllerErrorHandler {
  static handleError(error: AppError) {
    return {
      statusCode: getHttpStatusFromError(error),
      response: mapErrorToResponse(error),
    };
  }
}
