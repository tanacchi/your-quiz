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
 * 有効なソート基準の定数定義
 */
export const VALID_SORT_FIELDS = [
  "relevance",
  "created_date",
  "popularity",
  "difficulty",
] as const;

/**
 * クエリストリングから直接パースされた生の値用スキーマ
 *
 * query stringでは以下のような形でパラメータが渡される可能性がある：
 * - tags=javascript (単一文字列)
 * - tags[]=javascript&tags[]=typescript (配列)
 * - tags=~beginner (否定タグ)
 * - sort=-created_date (降順ソート)
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
  answer_type: z.string().optional(),
  creator_id: z.string().optional(),
  min_correct_rate: z.string().optional(),
  max_correct_rate: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
  sort: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
});

/**
 * 内部処理用の正規化されたスキーマ
 *
 * zodのtransformを使って生の値から正規化された値への変換を定義
 */
export const SearchQuerySchema = RawSearchQuerySchema.transform((data) => {
  // ソート処理：-プレフィックスで降順判定
  let sortField = data.sort || "relevance";
  let sortOrder: "asc" | "desc" = "asc";

  if (sortField.startsWith("-")) {
    sortOrder = "desc";
    sortField = sortField.substring(1);
  }

  // タグ処理：~プレフィックスで否定タグ分離
  const positiveTags: string[] = [];
  const negativeTags: string[] = [];

  if (data.tags) {
    const tagArray = Array.isArray(data.tags) ? data.tags : [data.tags];
    tagArray.forEach((tag) => {
      if (tag.startsWith("~")) {
        negativeTags.push(tag.substring(1));
      } else {
        positiveTags.push(tag);
      }
    });
  }

  return {
    q: data.q,

    // タグ: 肯定・否定に分離
    tags: positiveTags.length > 0 ? positiveTags : undefined,
    excludeTags: negativeTags.length > 0 ? negativeTags : undefined,

    difficulty: data.difficulty,

    // answerType: 文字列 → AnswerType型
    answerType: data.answer_type as
      | components["schemas"]["AnswerType"]
      | undefined,

    creatorId: data.creator_id,

    // 数値文字列 → 数値変換
    minCorrectRate: data.min_correct_rate
      ? parseFloat(data.min_correct_rate)
      : undefined,
    maxCorrectRate: data.max_correct_rate
      ? parseFloat(data.max_correct_rate)
      : undefined,

    createdAfter: data.created_after,
    createdBefore: data.created_before,

    // ソート設定
    sortBy: sortField as
      | "relevance"
      | "created_date"
      | "popularity"
      | "difficulty",
    sortOrder: sortOrder,
    limit: data.limit ? parseInt(data.limit, 10) : 20,
    offset: data.offset ? parseInt(data.offset, 10) : 0,
  };
})
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
      message: `Invalid answer_type. Must be one of: ${VALID_ANSWER_TYPES.join(", ")}`,
      path: ["answerType"],
    },
  )
  .refine(
    (data) => {
      // sortByのバリデーション
      return VALID_SORT_FIELDS.includes(
        data.sortBy as (typeof VALID_SORT_FIELDS)[number],
      );
    },
    {
      message: `Invalid sort field. Must be one of: ${VALID_SORT_FIELDS.join(", ")}`,
      path: ["sortBy"],
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
      message: "min_correct_rate must be a number between 0 and 1",
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
      message: "max_correct_rate must be a number between 0 and 1",
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
      message: "min_correct_rate cannot be greater than max_correct_rate",
      path: ["correctRate"],
    },
  )
  .refine(
    (data) => {
      // タグの妥当性チェック
      const allTags = [...(data.tags || []), ...(data.excludeTags || [])];
      return allTags.every((tag) => tag.length > 0 && tag.length <= 50);
    },
    {
      message: "Tag names must be between 1 and 50 characters",
      path: ["tags"],
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
