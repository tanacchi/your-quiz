import { z } from "zod";
import type { components } from "../../../../shared/types";
import type { operations } from "../../../../types/generated/api";

/**
 * Deck新規作成リクエスト用Zodスキーマ（POST /decks）
 *
 * `exactOptionalPropertyTypes`下では`.optional()`の出力型が
 * `T | undefined`になりTypeSpec型（`T?`のみ）と不一致になるため、
 * `.transform()`でundefinedフィールドをキーごと除去する
 * （`shared/schemas/quiz.schema.ts`と同じ対処パターン）。
 */
export const createDeckSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    quizIds: z.array(z.string()).min(1),
    source: z.enum(["manual_selection", "search_result", "wrong_questions"]),
    sourceQuery: z.string().optional(),
    maxQuizzes: z.coerce.number().int().min(1).default(100),
    shuffleOrder: z.coerce.boolean().default(false),
  })
  .transform((data) => ({
    quizIds: data.quizIds,
    source: data.source,
    maxQuizzes: data.maxQuizzes,
    shuffleOrder: data.shuffleOrder,
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.sourceQuery !== undefined && {
      sourceQuery: data.sourceQuery,
    }),
  })) satisfies z.ZodType<components["schemas"]["CreateDeckRequest"]>;

const quizSearchFiltersSchema = z
  .object({
    tags: z.array(z.string()).optional(),
    difficulty: z.string().optional(),
    answerType: z
      .enum(["boolean", "free_text", "single_choice", "multiple_choice"])
      .optional(),
    status: z
      .enum(["pending_approval", "approved", "rejected"])
      .default("approved"),
    creatorId: z.string().optional(),
  })
  .transform((data) => ({
    status: data.status,
    ...(data.tags !== undefined && { tags: data.tags }),
    ...(data.difficulty !== undefined && { difficulty: data.difficulty }),
    ...(data.answerType !== undefined && { answerType: data.answerType }),
    ...(data.creatorId !== undefined && { creatorId: data.creatorId }),
  })) satisfies z.ZodType<components["schemas"]["QuizSearchFilters"]>;

/**
 * 検索結果からDeck生成リクエスト用Zodスキーマ（POST /decks/from-search）
 */
export const createDeckFromSearchSchema = z
  .object({
    searchQuery: z.string(),
    filters: quizSearchFiltersSchema.optional(),
    maxQuizzes: z.coerce.number().int().min(1).default(50),
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .transform((data) => ({
    searchQuery: data.searchQuery,
    maxQuizzes: data.maxQuizzes,
    ...(data.filters !== undefined && { filters: data.filters }),
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
  })) satisfies z.ZodType<components["schemas"]["CreateDeckFromSearchRequest"]>;

/**
 * 間違い問題からDeck生成リクエスト用Zodスキーマ（POST /decks/wrong-questions）
 *
 * userIdはTypeSpecから削除済み（ADR-0027）。所有者は常に
 * `c.var.userFingerprint`から解決する。
 */
export const createDeckFromWrongAnswersSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    maxQuizzes: z.coerce.number().int().min(1).default(50),
    sinceDays: z.coerce.number().int().min(1).default(30),
  })
  .transform((data) => ({
    maxQuizzes: data.maxQuizzes,
    sinceDays: data.sinceDays,
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
  })) satisfies z.ZodType<
  operations["QuizLearning_createDeckFromWrongAnswers"]["requestBody"]["content"]["application/json"]
>;

/**
 * Deck部分更新リクエスト用Zodスキーマ（PATCH /decks/:id）
 */
export const updateDeckSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    quizIds: z.array(z.string()).min(1).optional(),
  })
  .transform((data) => ({
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.quizIds !== undefined && { quizIds: data.quizIds }),
  })) satisfies z.ZodType<components["schemas"]["UpdateDeckRequest"]>;
