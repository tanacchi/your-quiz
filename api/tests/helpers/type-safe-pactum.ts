import { eachLike, like } from "pactum-matchers";
import type {
  ApiErrorResponse,
  ConflictErrorResponse,
  CreateQuizResponse,
  ForbiddenErrorResponse,
  InternalServerErrorResponse,
  NotFoundErrorResponse,
  QuizListResponse,
  QuizSummaryListResponse,
  QuizSummaryResponse,
  QuizWithSolutionResponse,
  RateLimitErrorResponse,
  UnauthorizedErrorResponse,
  ValidationErrorResponse,
} from "../types/api-error-types";
import {
  assertConflictError,
  assertForbiddenError,
  assertInternalServerError,
  assertNotFoundError,
  assertRateLimitError,
  assertUnauthorizedError,
  assertValidationError,
  isCreateQuizResponse,
  isQuizListResponse,
  isQuizSummaryListResponse,
  isQuizSummaryResponse,
  isQuizWithSolutionResponse,
} from "../types/api-error-types";

/**
 * PactumJS型安全レスポンス処理ユーティリティ
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This utility class is intended to be static-only
export class TypeSafePactumHelper {
  /**
   * エラーレスポンスを型安全に処理
   */
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 400,
  ): ValidationErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 401,
  ): UnauthorizedErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 403,
  ): ForbiddenErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 404,
  ): NotFoundErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 409,
  ): ConflictErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 429,
  ): RateLimitErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: 500,
  ): InternalServerErrorResponse;
  static assertErrorResponse(
    response: unknown,
    expectedStatusCode: number,
  ): ApiErrorResponse {
    switch (expectedStatusCode) {
      case 400:
        return assertValidationError(response);
      case 401:
        return assertUnauthorizedError(response);
      case 403:
        return assertForbiddenError(response);
      case 404:
        return assertNotFoundError(response);
      case 409:
        return assertConflictError(response);
      case 429:
        return assertRateLimitError(response);
      case 500:
        return assertInternalServerError(response);
      default:
        throw new Error(`Unsupported error status code: ${expectedStatusCode}`);
    }
  }

  /**
   * 成功レスポンスを型安全に処理
   */
  static assertSuccessResponse<T>(
    response: unknown,
    typeGuard: (response: unknown) => response is T,
    typeName: string,
  ): T {
    if (!typeGuard(response)) {
      throw new Error(
        `Expected ${typeName} but got invalid response structure`,
      );
    }
    return response;
  }

  static assertCreateQuizResponse(response: unknown): CreateQuizResponse {
    return TypeSafePactumHelper.assertSuccessResponse(
      response,
      isCreateQuizResponse,
      "CreateQuizResponse",
    );
  }

  static assertQuizWithSolutionResponse(
    response: unknown,
  ): QuizWithSolutionResponse {
    return TypeSafePactumHelper.assertSuccessResponse(
      response,
      isQuizWithSolutionResponse,
      "QuizWithSolutionResponse",
    );
  }

  static assertQuizSummaryResponse(response: unknown): QuizSummaryResponse {
    return TypeSafePactumHelper.assertSuccessResponse(
      response,
      isQuizSummaryResponse,
      "QuizSummaryResponse",
    );
  }

  static assertQuizSummaryListResponse(
    response: unknown,
  ): QuizSummaryListResponse {
    return TypeSafePactumHelper.assertSuccessResponse(
      response,
      isQuizSummaryListResponse,
      "QuizSummaryListResponse",
    );
  }

  static assertQuizListResponse(response: unknown): QuizListResponse {
    return TypeSafePactumHelper.assertSuccessResponse(
      response,
      isQuizListResponse,
      "QuizListResponse",
    );
  }
}

/**
 * PactumJSマッチャー定義
 * 構造的なレスポンス検証に使用
 */
export const PactumMatchers = {
  // エラーレスポンスマッチャー
  validationError: {
    code: 400,
    message: like("string"),
    fieldErrors: like({}),
    details: like("string"),
    requestId: like("string"),
  },

  notFoundError: {
    code: 404,
    message: "Resource not found",
    details: like("string"),
    requestId: like("string"),
  },

  forbiddenError: {
    code: 403,
    message: "Forbidden operation",
    details: like("string"),
    requestId: like("string"),
  },

  conflictError: {
    code: 409,
    message: "Resource conflict",
    details: like("string"),
    requestId: like("string"),
  },

  rateLimitError: {
    code: 429,
    message: "Rate limit exceeded",
    details: like("string"),
    requestId: like("string"),
  },

  internalServerError: {
    code: 500,
    message: "Internal server error",
    details: like("string"),
    requestId: like("string"),
  },

  unauthorizedError: {
    code: 401,
    message: "Unauthorized access",
    details: like("string"),
    requestId: like("string"),
  },

  // 成功レスポンスマッチャー
  createQuizResponse: {
    quiz: {
      id: like("string"),
      question: like("string"),
      answerType: like("string"),
      solutionId: like("string"),
      status: like("string"),
      creatorId: like("string"),
      createdAt: like("string"),
    },
    status: "pending_approval",
  },

  quizWithSolutionResponse: {
    id: like("string"),
    question: like("string"),
    answerType: like("string"),
    solutionId: like("string"),
    status: like("string"),
    creatorId: like("string"),
    createdAt: like("string"),
    solution: like({}),
    tags: eachLike("string"),
  },

  quizListResponse: {
    items: eachLike({
      id: like("string"),
      question: like("string"),
      answerType: like("string"),
      solutionId: like("string"),
      status: like("string"),
      creatorId: like("string"),
      createdAt: like("string"),
      solution: like({}),
      tags: eachLike("string"),
    }),
    totalCount: like(1),
    hasMore: like(true),
    continuationToken: like("string"),
  },
};

/**
 * 型安全なテストヘルパー関数
 */
export const TypeSafeTestHelpers = {
  /**
   * バリデーションエラーのフィールドエラーをチェック
   */
  expectFieldErrors(
    validationError: ValidationErrorResponse,
    expectedFields: string[],
  ): void {
    if (!validationError.fieldErrors) {
      throw new Error("Expected fieldErrors but none found");
    }

    expectedFields.forEach((field) => {
      const hasFieldError =
        validationError.fieldErrors?.[field] ||
        Object.keys(validationError.fieldErrors ?? {}).some((key) =>
          key.includes(field),
        );

      if (!hasFieldError) {
        throw new Error(`Expected field error for '${field}' but not found`);
      }
    });
  },

  /**
   * エラーレスポンスの基本構造をチェック
   */
  expectErrorStructure(error: ApiErrorResponse): void {
    expect(error).toHaveProperty("code");
    expect(error).toHaveProperty("message");
    expect(typeof error.code).toBe("number");
    expect(typeof error.message).toBe("string");
    expect(error.code).toBeGreaterThanOrEqual(400);
    expect(error.code).toBeLessThan(600);

    if (error.details) {
      expect(typeof error.details).toBe("string");
    }

    if (error.requestId) {
      expect(typeof error.requestId).toBe("string");
    }
  },

  /**
   * TypeSpec準拠のエラーメッセージパターンをチェック
   */
  expectErrorMessagePattern(error: ApiErrorResponse): void {
    const messagePatterns: Record<number, RegExp> = {
      400: /validation|invalid|required/i,
      401: /unauthorized|authentication/i,
      403: /forbidden|access/i,
      404: /not found|does not exist/i,
      409: /conflict|already/i,
      429: /rate limit|too many/i,
      500: /internal|server error/i,
    };

    const expectedPattern = messagePatterns[error.code];
    if (expectedPattern) {
      expect(error.message).toMatch(expectedPattern);
    }
  },
};

/**
 * PactumJSとの統合ヘルパー
 */
export const PactumIntegrationHelpers = {
  /**
   * エラーレスポンスのマッチングと型アサーションを組み合わせ
   */
  async expectErrorResponse<T extends ApiErrorResponse>(
    // biome-ignore lint/suspicious/noExplicitAny: allow any for library compatibility
    pactumSpec: any,
    statusCode: number,
    assertionFn: (response: unknown) => T,
  ): Promise<T> {
    const response = await pactumSpec.expectStatus(statusCode);
    return assertionFn(response.json);
  },

  /**
   * 成功レスポンスのマッチングと型アサーションを組み合わせ
   */
  async expectSuccessResponse<T>(
    // biome-ignore lint/suspicious/noExplicitAny: allow any for library compatibility
    pactumSpec: any,
    statusCode: number,
    assertionFn: (response: unknown) => T,
  ): Promise<T> {
    const response = await pactumSpec.expectStatus(statusCode);
    return assertionFn(response.json);
  },
};
