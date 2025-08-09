import { z } from "zod";
import type { components } from "../../../../types/generated/api";

/**
 * 有効な回答タイプの定数定義
 */
export const VALID_ANSWER_TYPES = [
  "boolean",
  "free_text",
  "single_choice",
  "multiple_choice",
] as const;

/**
 * クエリストリングから直接パースされた生の値用スキーマ
 *
 * query stringでは以下のような形でパラメータが渡される可能性がある：
 * - tags=javascript (単一文字列)
 * - tags[]=javascript&tags[]=typescript (配列)
 * - limit=20 (文字列として渡される数値)
 */
export const RawSearchQuerySchema = z.object({
  q: z.string().optional(),
  tags: z
    .union([
      z.string(), // 単一のタグ
      z.array(z.string()), // 複数のタグ
    ])
    .optional(),
  difficulty: z.string().optional(),
  answerType: z.string().optional(),
  creatorId: z.string().optional(),
  minCorrectRate: z.string().optional(),
  maxCorrectRate: z.string().optional(),
  createdAfter: z.string().optional(),
  createdBefore: z.string().optional(),
  sortBy: z
    .enum(["relevance", "created_date", "popularity", "difficulty"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
});

/**
 * 内部処理用の正規化されたスキーマ
 *
 * zodのtransformを使って生の値から正規化された値への変換を定義
 */
export const SearchQuerySchema = RawSearchQuerySchema.transform((data) => ({
  q: data.q,

  // tags: 文字列 or 配列 → 配列に正規化
  tags: data.tags
    ? Array.isArray(data.tags)
      ? data.tags
      : [data.tags]
    : undefined,

  difficulty: data.difficulty,

  // answerType: 文字列 → AnswerType型
  answerType: data.answerType as
    | components["schemas"]["AnswerType"]
    | undefined,

  creatorId: data.creatorId,

  // 数値文字列 → 数値変換
  minCorrectRate: data.minCorrectRate
    ? parseFloat(data.minCorrectRate)
    : undefined,
  maxCorrectRate: data.maxCorrectRate
    ? parseFloat(data.maxCorrectRate)
    : undefined,

  createdAfter: data.createdAfter,
  createdBefore: data.createdBefore,

  // デフォルト値設定
  sortBy: data.sortBy || "relevance",
  sortOrder: data.sortOrder || "desc",
  limit: data.limit ? parseInt(data.limit, 10) : 20,
  offset: data.offset ? parseInt(data.offset, 10) : 0,
}))
  .refine(
    (data) => {
      // answerTypeのバリデーション
      if (data.answerType) {
        return VALID_ANSWER_TYPES.includes(
          data.answerType as (typeof VALID_ANSWER_TYPES)[number],
        );
      }
      return true;
    },
    {
      message: `Invalid answerType. Must be one of: ${VALID_ANSWER_TYPES.join(", ")}`,
      path: ["answerType"],
    },
  )
  .refine(
    (data) => {
      // minCorrectRateの範囲チェック
      if (data.minCorrectRate !== undefined) {
        return (
          !Number.isNaN(data.minCorrectRate) &&
          data.minCorrectRate >= 0 &&
          data.minCorrectRate <= 1
        );
      }
      return true;
    },
    {
      message: "minCorrectRate must be a number between 0 and 1",
      path: ["minCorrectRate"],
    },
  )
  .refine(
    (data) => {
      // maxCorrectRateの範囲チェック
      if (data.maxCorrectRate !== undefined) {
        return (
          !Number.isNaN(data.maxCorrectRate) &&
          data.maxCorrectRate >= 0 &&
          data.maxCorrectRate <= 1
        );
      }
      return true;
    },
    {
      message: "maxCorrectRate must be a number between 0 and 1",
      path: ["maxCorrectRate"],
    },
  )
  .refine(
    (data) => {
      // limitの範囲チェック
      return !Number.isNaN(data.limit) && data.limit >= 1 && data.limit <= 100;
    },
    {
      message: "limit must be an integer between 1 and 100",
      path: ["limit"],
    },
  )
  .refine(
    (data) => {
      // offsetの範囲チェック
      return !Number.isNaN(data.offset) && data.offset >= 0;
    },
    {
      message: "offset must be a non-negative integer",
      path: ["offset"],
    },
  )
  .refine(
    (data) => {
      // 正答率の論理的整合性チェック
      if (
        data.minCorrectRate !== undefined &&
        data.maxCorrectRate !== undefined
      ) {
        return data.minCorrectRate <= data.maxCorrectRate;
      }
      return true;
    },
    {
      message: "minCorrectRate cannot be greater than maxCorrectRate",
      path: ["correctRate"],
    },
  );

/**
 * 生の検索クエリの型定義
 */
export type RawSearchQuery = z.infer<typeof RawSearchQuerySchema>;

/**
 * 正規化された検索クエリの型定義
 */
export type SearchQuery = z.infer<typeof SearchQuerySchema>;
