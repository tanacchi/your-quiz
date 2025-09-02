// TypeSpec生成型からエラー型を再エクスポート

import { z } from "zod";
import type { components } from "../../src/types/generated/api";

/**
 * Zodスキーマ定義
 * TypeSpec仕様に完全準拠した実行時型検証
 */

// 基底エラーレスポンススキーマ
const BaseErrorResponseSchema = z.object({
  code: z.number().int().min(400).max(599),
  message: z.string().min(1),
  details: z.string().optional(),
  requestId: z.string().optional(),
});

// 個別エラーレスポンススキーマ
export const ValidationErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(400),
  fieldErrors: z.record(z.string(), z.string()).optional(),
});

export const UnauthorizedErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(401),
  message: z.literal("Unauthorized access"),
});

export const ForbiddenErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(403),
  message: z.literal("Forbidden operation"),
});

export const NotFoundErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(404),
  message: z.literal("Resource not found"),
});

export const ConflictErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(409),
  message: z.literal("Resource conflict"),
});

export const RateLimitErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(429),
  message: z.literal("Rate limit exceeded"),
});

export const InternalServerErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(500),
  message: z.literal("Internal server error"),
});

// APIエラーレスポンス統合スキーマ
export const ApiErrorResponseSchema = z.union([
  ValidationErrorSchema,
  UnauthorizedErrorSchema,
  ForbiddenErrorSchema,
  NotFoundErrorSchema,
  ConflictErrorSchema,
  RateLimitErrorSchema,
  InternalServerErrorSchema,
]);

// 成功レスポンススキーマ
export const CreateQuizResponseSchema = z.object({
  quiz: z.object({
    id: z.string(),
    question: z.string(),
    answerType: z.enum([
      "boolean",
      "free_text",
      "single_choice",
      "multiple_choice",
    ]),
    solutionId: z.string(),
    explanation: z.string().optional(),
    status: z.enum(["pending_approval", "approved", "rejected"]),
    creatorId: z.string(),
    createdAt: z.string(),
    approvedAt: z.string().optional(),
  }),
  status: z.literal("pending_approval"),
  estimatedApprovalDate: z.string().optional(),
});

export const QuizResponseSchema = z.object({
  id: z.string(),
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
  solutionId: z.string(),
  explanation: z.string().optional(),
  status: z.enum(["pending_approval", "approved", "rejected"]),
  creatorId: z.string(),
  createdAt: z.string(),
  approvedAt: z.string().optional(),
  solution: z
    .object({
      id: z.string(),
      type: z.enum([
        "boolean",
        "free_text",
        "single_choice",
        "multiple_choice",
      ]),
    })
    .catchall(z.unknown()), // 型により構造が異なるためcatchallを使用
  tags: z.array(z.string()).optional(),
});

// QuizSummary schema - solution情報を含まない軽量版
export const QuizSummaryResponseSchema = z.object({
  id: z.string(),
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
  solutionId: z.string(),
  explanation: z.string().optional(),
  status: z.enum(["pending_approval", "approved", "rejected"]),
  creatorId: z.string(),
  createdAt: z.string(),
  approvedAt: z.string().optional(),
  tagIds: z.array(z.string()),
});

export const QuizSummaryListResponseSchema = z.object({
  items: z.array(QuizSummaryResponseSchema),
  totalCount: z.number().int().min(0),
  hasMore: z.boolean(),
  continuationToken: z.string().optional(),
});

/**
 * TypeScript型定義（Zodから推論）
 */
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export type ValidationErrorResponse = z.infer<typeof ValidationErrorSchema>;
export type UnauthorizedErrorResponse = z.infer<typeof UnauthorizedErrorSchema>;
export type ForbiddenErrorResponse = z.infer<typeof ForbiddenErrorSchema>;
export type NotFoundErrorResponse = z.infer<typeof NotFoundErrorSchema>;
export type ConflictErrorResponse = z.infer<typeof ConflictErrorSchema>;
export type RateLimitErrorResponse = z.infer<typeof RateLimitErrorSchema>;
export type InternalServerErrorResponse = z.infer<
  typeof InternalServerErrorSchema
>;

export type CreateQuizResponse = z.infer<typeof CreateQuizResponseSchema>;
export type QuizResponse = z.infer<typeof QuizResponseSchema>;
export type QuizSummaryResponse = z.infer<typeof QuizSummaryResponseSchema>;
export type QuizSummaryListResponse = z.infer<
  typeof QuizSummaryListResponseSchema
>;

// TypeSpec型との互換性を保持
export type TypeSpecValidationErrorResponse =
  components["schemas"]["ValidationError"];
export type TypeSpecNotFoundErrorResponse =
  components["schemas"]["NotFoundError"];
export type TypeSpecCreateQuizResponse =
  components["schemas"]["CreateQuizResponse"];
export type TypeSpecQuizResponse = components["schemas"]["QuizResponse"];
export type TypeSpecQuizSummaryResponse = components["schemas"]["QuizSummary"];
export type TypeSpecQuizSummaryListResponse =
  components["schemas"]["QuizSummaryListResponse"];

/**
 * Zodベース型ガード関数群
 * 強力な実行時型検証によりレスポンスの型安全性を保証
 */

// 汎用的なZod型ガード関数ヘルパー
function createZodTypeGuard<T>(schema: z.ZodSchema<T>) {
  return (response: unknown): response is T => {
    const result = schema.safeParse(response);
    return result.success;
  };
}

// エラーレスポンス型ガード関数
export const isApiErrorResponse = createZodTypeGuard(ApiErrorResponseSchema);
export const isValidationError = createZodTypeGuard(ValidationErrorSchema);
export const isUnauthorizedError = createZodTypeGuard(UnauthorizedErrorSchema);
export const isForbiddenError = createZodTypeGuard(ForbiddenErrorSchema);
export const isNotFoundError = createZodTypeGuard(NotFoundErrorSchema);
export const isConflictError = createZodTypeGuard(ConflictErrorSchema);
export const isRateLimitError = createZodTypeGuard(RateLimitErrorSchema);
export const isInternalServerError = createZodTypeGuard(
  InternalServerErrorSchema,
);

// 成功レスポンス型ガード関数
export const isCreateQuizResponse = createZodTypeGuard(
  CreateQuizResponseSchema,
);
export const isQuizResponse = createZodTypeGuard(QuizResponseSchema);
export const isQuizSummaryResponse = createZodTypeGuard(
  QuizSummaryResponseSchema,
);
export const isQuizSummaryListResponse = createZodTypeGuard(
  QuizSummaryListResponseSchema,
);

/**
 * Zodベース型アサーション関数群
 * スキーマ検証とエラーメッセージを組み合わせた安全な型変換
 */

// 汎用的なZod型アサーション関数ヘルパー
function createZodAssertion<T>(schema: z.ZodSchema<T>, errorPrefix: string) {
  return (response: unknown): T => {
    const result = schema.safeParse(response);
    if (!result.success) {
      const errorDetails = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      throw new Error(`${errorPrefix}. Validation errors: ${errorDetails}`);
    }
    return result.data;
  };
}

// エラーレスポンス型アサーション関数
export const assertValidationError = createZodAssertion(
  ValidationErrorSchema,
  "Expected ValidationError (400)",
);

export const assertUnauthorizedError = createZodAssertion(
  UnauthorizedErrorSchema,
  "Expected UnauthorizedError (401)",
);

export const assertForbiddenError = createZodAssertion(
  ForbiddenErrorSchema,
  "Expected ForbiddenError (403)",
);

export const assertNotFoundError = createZodAssertion(
  NotFoundErrorSchema,
  "Expected NotFoundError (404)",
);

export const assertConflictError = createZodAssertion(
  ConflictErrorSchema,
  "Expected ConflictError (409)",
);

export const assertRateLimitError = createZodAssertion(
  RateLimitErrorSchema,
  "Expected RateLimitError (429)",
);

export const assertInternalServerError = createZodAssertion(
  InternalServerErrorSchema,
  "Expected InternalServerError (500)",
);

export const assertApiErrorResponse = createZodAssertion(
  ApiErrorResponseSchema,
  "Expected valid API error response",
);

// 成功レスポンス型アサーション関数
export const assertCreateQuizResponse = createZodAssertion(
  CreateQuizResponseSchema,
  "Expected CreateQuizResponse",
);

export const assertQuizResponse = createZodAssertion(
  QuizResponseSchema,
  "Expected QuizResponse",
);

export const assertQuizSummaryResponse = createZodAssertion(
  QuizSummaryResponseSchema,
  "Expected QuizSummaryResponse",
);

export const assertQuizSummaryListResponse = createZodAssertion(
  QuizSummaryListResponseSchema,
  "Expected QuizSummaryListResponse",
);

/**
 * スキーマベース型検証ユーティリティ
 * より高度な型検証が必要な場合に使用
 */
export const SchemaValidators = {
  // 詳細なバリデーション結果を取得
  validateWithDetails<T>(schema: z.ZodSchema<T>, response: unknown) {
    return schema.safeParse(response);
  },

  // 部分的なバリデーション（必要な部分のみチェック）
  validatePartial<T>(schema: z.ZodSchema<T>, response: unknown, path?: string) {
    const result = schema.safeParse(response);
    if (!result.success && path) {
      const relevantErrors = result.error.issues.filter((issue) =>
        issue.path.some((p) => p.toString().includes(path)),
      );
      return { success: false, issues: relevantErrors };
    }
    return {
      success: result.success,
      data: result.success ? result.data : undefined,
    };
  },

  // フィールドレベルのバリデーション
  validateField(
    fieldSchema: z.ZodSchema,
    fieldValue: unknown,
    fieldName: string,
  ) {
    const result = fieldSchema.safeParse(fieldValue);
    if (!result.success) {
      throw new Error(
        `Field '${fieldName}' validation failed: ${result.error.issues[0]?.message}`,
      );
    }
    return result.data;
  },
} as const;
