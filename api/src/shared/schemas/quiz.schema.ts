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
export const createQuizSchema = z
  .object({
    question: z.string(),
    answerType: z.enum([
      "boolean",
      "free_text",
      "single_choice",
      "multiple_choice",
    ]),
    solution: solutionSchema,
    explanation: z.string().nullish(),
    tags: z.array(z.string()).nullish(),
  })
  .superRefine((data, ctx) => {
    // Check if answerType matches solution.type
    if (data.answerType !== data.solution.type) {
      ctx.addIssue({
        code: "custom",
        message: `answerType '${data.answerType}' does not match solution type '${data.solution.type}'`,
        path: ["solution", "type"],
      });
    }
  })
  .transform((data) => ({
    ...data,
    explanation: data.explanation == null ? "" : data.explanation,
    tags: data.tags == null ? [] : data.tags,
  })) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;
