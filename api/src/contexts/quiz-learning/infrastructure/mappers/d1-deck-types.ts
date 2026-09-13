/**
 * D1データベースのDeck行データの型定義とマッパー (Zod版)
 *
 * quiz-managementのd1-types.tsと同じパターンに従う。
 */

import { z } from "zod";

export type D1QueryParam = string | number | boolean | null;

/**
 * D1の数値IDを文字列に変換するスキーマ
 */
const d1IdSchema = z.union([z.string(), z.number()]).transform(String);

/**
 * `quiz_ids` カラム（JSON文字列、例: "[1,9,14,20]"）を文字列配列に変換するスキーマ
 *
 * D1/SQLite上は配列型が存在しないため、TypeSpecのconvert-to-sqlite.tsが
 * `QuizId[]` を `TEXT` カラムに変換している（api/spec/scripts/sqlite-mappings.ts参照）。
 */
const quizIdsJsonSchema = z.string().transform((value, ctx) => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    ctx.addIssue({ code: "custom", message: "quiz_ids must be valid JSON" });
    return z.NEVER;
  }
  if (!Array.isArray(parsed)) {
    ctx.addIssue({ code: "custom", message: "quiz_ids must be a JSON array" });
    return z.NEVER;
  }
  return parsed.map((id) => String(id));
});

/**
 * Deck関連のD1行データスキーマ
 */
export const zodDeckRowSchema = z
  .object({
    id: d1IdSchema,
    name: z.string(),
    description: z.string().nullish(),
    quiz_ids: quizIdsJsonSchema,
    creator_id: d1IdSchema,
    created_at: z.string(),
    last_modified_at: z.string(),
  })
  .transform((data) => ({
    id: data.id,
    name: data.name,
    quiz_ids: data.quiz_ids,
    creator_id: data.creator_id,
    created_at: data.created_at,
    last_modified_at: data.last_modified_at,
    ...(data.description != null && { description: data.description }),
  }));

export type DeckRow = z.infer<typeof zodDeckRowSchema>;
