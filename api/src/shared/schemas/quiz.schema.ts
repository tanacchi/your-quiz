import { z } from "zod";
import type { components } from "../../types/generated/api";
import { solutionSchema } from "./solution.schema";

/**
 * クイズ作成リクエスト用Zodスキーマ
 *
 * クイズ作成APIのリクエストボディを検証するためのZodスキーマです。
 * TypeSpecで定義されたCreateQuizRequest型と型互換性があります。
 *
 * @example
 * ```typescript
 * const result = createQuizSchema.safeParse({
 *   question: "TypeScriptとは？",
 *   answerType: "single_choice",
 *   solution: { type: "single_choice", correctIndex: 0, choices: ["言語", "フレームワーク"] },
 *   explanation: "TypeScriptはJavaScriptに型システムを追加した言語です",
 *   tags: ["プログラミング", "TypeScript"]
 * });
 * ```
 */
export const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
  solution: solutionSchema,
  explanation: z.string(),
  tags: z.array(z.string()),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;
