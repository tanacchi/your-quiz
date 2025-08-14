import { z } from "zod";
import type { components } from "../../../../shared/types";

/**
 * クイズリスト取得クエリの柔軟なZodスキーマ
 *
 * HTTPクエリパラメータとドメインクエリの両方を受け取れる
 * 緩めの定義でバリデーション＋型安全なtransformを提供
 */

// QuizStatusの有効値定義
const VALID_QUIZ_STATUSES = [
  "pending_approval",
  "approved",
  "rejected",
] as const;

// 単一文字列または文字列配列を文字列配列に正規化するtransform
const normalizeToStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    return [value];
  }
  return [];
};

// 文字列を数値に安全に変換するtransform
const safeParseNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

// クイズステータスを安全に変換するtransform
const parseQuizStatus = (
  value: unknown,
): components["schemas"]["QuizStatus"] | undefined => {
  if (typeof value === "string" && value in VALID_QUIZ_STATUSES) {
    return value as components["schemas"]["QuizStatus"];
  }
  return "approved";
};

/**
 * 緩めのHTTPクエリパラメータスキーマ
 * 様々な形式の入力を受け取り、適切な型に変換
 */
export const httpQueryParamsSchema = z.object({
  status: z.string().nullish().transform(parseQuizStatus),

  creatorId: z
    .string()
    .nullish()
    .transform((value) => value || undefined),

  ids: z
    .union([z.string(), z.array(z.string())])
    .nullish()
    .transform((value) => {
      const normalized = normalizeToStringArray(value);
      return normalized.length > 0 ? normalized : undefined;
    }),

  limit: z
    .union([z.string(), z.number()])
    .nullish()
    .transform((value) => {
      const parsed = safeParseNumber(value);
      // 1以上100以下の範囲でクランプ
      return parsed && parsed >= 1 && parsed <= 100 ? parsed : undefined;
    }),

  offset: z
    .union([z.string(), z.number()])
    .nullish()
    .transform((value) => {
      const parsed = safeParseNumber(value);
      // 0以上の値のみ許可
      return parsed && parsed >= 0 ? parsed : undefined;
    }),
});

/**
 * 厳密なドメインクエリスキーマ
 * ビジネスロジックで使用する正規化された型
 */
export const listQuizzesQuerySchema = z.object({
  status: z.enum(VALID_QUIZ_STATUSES).default("approved"),
  creatorId: z.string().min(1).optional(),
  ids: z.array(z.string().min(1)).optional(),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).default(0),
});

/**
 * 全体スキーマのtransform: HttpQueryParams → ListQuizzesQuery
 */
export const transformHttpToQuery = httpQueryParamsSchema.transform(
  (httpParams) => {
    // デフォルト値の適用
    const query: z.infer<typeof listQuizzesQuerySchema> = {
      status: httpParams.status ?? "approved",
      creatorId: httpParams.creatorId,
      ids: httpParams.ids,
      limit: httpParams.limit ?? 10, // デフォルト10件
      offset: httpParams.offset ?? 0, // デフォルト0オフセット
    };

    // undefined値を除去して最終的なクエリを構築
    return Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined),
    ) as z.infer<typeof listQuizzesQuerySchema>;
  },
);

/**
 * 型定義のエクスポート
 */
export type HttpQueryParams = z.input<typeof httpQueryParamsSchema>;
export type ListQuizzesQuery = z.output<typeof listQuizzesQuerySchema>;
export type TransformedQuery = z.output<typeof transformHttpToQuery>;

/**
 * バリデーション関数
 */
export const validateHttpQueryParams = (input: unknown) => {
  return httpQueryParamsSchema.safeParse(input);
};

export const validateListQuizzesQuery = (input: unknown) => {
  return listQuizzesQuerySchema.safeParse(input);
};

export const transformAndValidateQuery = (input: unknown) => {
  return transformHttpToQuery.safeParse(input);
};
