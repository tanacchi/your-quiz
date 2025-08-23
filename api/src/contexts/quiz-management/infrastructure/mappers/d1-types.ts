/**
 * D1データベースのクエリ結果の型定義とマッパー (Zod版)
 */

import { z } from "zod";

/**
 * D1クエリのパラメータ型
 */
export type D1QueryParam = string | number | boolean | null;

/**
 * D1の数値IDを文字列に変換するスキーマ
 */
const d1IdSchema = z.union([z.string(), z.number()]).transform(String);

/**
 * 列挙型スキーマ
 */
export const zodAnswerTypeSchema = z.enum([
  "boolean",
  "free_text",
  "single_choice",
  "multiple_choice",
]);

export const zodQuizStatusSchema = z.enum([
  "pending_approval",
  "approved",
  "rejected",
]);

export const zodMatchingStrategySchema = z.enum(["exact", "partial", "regex"]);

/**
 * クイズ関連のD1行データスキーマ
 */
export const zodQuizRowSchema = z
  .object({
    id: d1IdSchema,
    question: z.string(),
    answer_type: zodAnswerTypeSchema,
    solution_id: d1IdSchema,
    explanation: z.string().nullable().optional(),
    status: zodQuizStatusSchema,
    creator_id: d1IdSchema,
    created_at: z.string(),
    approved_at: z.string().nullable().optional(),
    // ソリューション関連のフィールド
    boolean_value: z
      .union([z.boolean(), z.number()])
      .transform(Boolean)
      .nullable()
      .optional(),
    correct_answer: z.string().nullable().optional(),
    matching_strategy: zodMatchingStrategySchema.nullable().optional(),
    case_sensitive: z
      .union([z.boolean(), z.number()])
      .transform(Boolean)
      .nullable()
      .optional(),
    choices: z.string().nullable().optional(),
    min_correct_answers: z
      .union([
        z.number(),
        z
          .string()
          .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
          .transform(Number),
      ])
      .nullable()
      .optional(),
  })
  .transform((data) => {
    // null/undefined の optional フィールドは除外
    const result = {
      id: data.id,
      question: data.question,
      answer_type: data.answer_type,
      solution_id: data.solution_id,
      status: data.status,
      creator_id: data.creator_id,
      created_at: data.created_at,
      ...(data.explanation != null && { explanation: data.explanation }),
      ...(data.approved_at != null && { approved_at: data.approved_at }),
      ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
      ...(data.correct_answer != null && {
        correct_answer: data.correct_answer,
      }),
      ...(data.matching_strategy != null && {
        matching_strategy: data.matching_strategy,
      }),
      ...(data.case_sensitive != null && {
        case_sensitive: data.case_sensitive,
      }),
      ...(data.choices != null && { choices: data.choices }),
      ...(data.min_correct_answers != null && {
        min_correct_answers: data.min_correct_answers,
      }),
    };

    return result;
  });

/**
 * D1の COUNT クエリ結果スキーマ
 */
export const zodCountResultSchema = z.object({
  total: z.union([
    z.number(),
    z
      .string()
      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
      .transform(Number),
  ]),
});

/**
 * 基本的なクイズ情報スキーマ（削除時に使用）
 */
export const zodBasicQuizInfoSchema = z.object({
  id: d1IdSchema,
  solution_id: d1IdSchema,
  answer_type: zodAnswerTypeSchema,
});

/**
 * JSON.parse後の選択肢データスキーマ
 */
export const zodParsedChoiceSchema = z.object({
  id: z.string(),
  solutionId: z.string(),
  text: z.string(),
  orderIndex: z.union([
    z.number(),
    z
      .string()
      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
      .transform(Number),
  ]),
  isCorrect: z.boolean(),
});

/**
 * 既存の型定義（Zodから推論）
 */
export type QuizRow = z.infer<typeof zodQuizRowSchema>;
export type CountResult = z.infer<typeof zodCountResultSchema>;
export type BasicQuizInfo = z.infer<typeof zodBasicQuizInfoSchema>;
export type ParsedChoice = z.infer<typeof zodParsedChoiceSchema>;

/**
 * 型ガード関数群（Zodベース）
 */

/**
 * D1クエリ結果がQuizRowの形式かチェック
 */
export function isQuizRow(data: unknown): data is QuizRow {
  const result = zodQuizRowSchema.safeParse(data);
  return result.success;
}

/**
 * D1クエリ結果がCountResultの形式かチェック
 */
export function isCountResult(data: unknown): data is CountResult {
  const result = zodCountResultSchema.safeParse(data);
  return result.success;
}

/**
 * D1クエリ結果がBasicQuizInfoの形式かチェック
 */
export function isBasicQuizInfo(data: unknown): data is BasicQuizInfo {
  const result = zodBasicQuizInfoSchema.safeParse(data);
  return result.success;
}

/**
 * ParsedChoiceかチェック
 */
export function isParsedChoice(data: unknown): data is ParsedChoice {
  const result = zodParsedChoiceSchema.safeParse(data);
  return result.success;
}

/**
 * ParsedChoiceの配列かチェック
 */
export function isParsedChoiceArray(data: unknown): data is ParsedChoice[] {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every((item) => isParsedChoice(item));
}

/**
 * 有効なanswerTypeかチェック
 */
export function isValidAnswerType(
  value: string,
): value is "boolean" | "free_text" | "single_choice" | "multiple_choice" {
  const result = zodAnswerTypeSchema.safeParse(value);
  return result.success;
}

/**
 * 有効なQuizStatusかチェック
 */
export function isValidQuizStatus(
  value: string,
): value is "pending_approval" | "approved" | "rejected" {
  const result = zodQuizStatusSchema.safeParse(value);
  return result.success;
}

/**
 * 有効なMatchingStrategyかチェック
 */
export function isValidMatchingStrategy(
  value: string,
): value is "exact" | "partial" | "regex" {
  const result = zodMatchingStrategySchema.safeParse(value);
  return result.success;
}

/**
 * 型変換ヘルパー関数群（Zodベース）
 */

/**
 * Record<string, unknown>からQuizRowに安全に変換
 */
export function toQuizRow(data: Record<string, unknown>): QuizRow {
  const result = zodQuizRowSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid QuizRow data: ${result.error.message}`);
  }
  return result.data;
}

/**
 * CountResultから安全に値を取得
 */
export function getCountValue(result: CountResult): number {
  return result.total;
}

/**
 * BasicQuizInfoから安全にプロパティを取得
 */
export function toBasicQuizInfo(data: Record<string, unknown>): {
  id: string;
  solution_id: string;
  answer_type: string;
} {
  const result = zodBasicQuizInfoSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid BasicQuizInfo data: ${result.error.message}`);
  }
  return result.data;
}
