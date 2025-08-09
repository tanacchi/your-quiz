import { z } from "zod";
import type { components } from "../../types/generated/api";

/**
 * クイズ正解データ用Zodスキーマ
 *
 * クイズの正解情報を検証するためのZodスキーマです。
 * 回答タイプ（boolean、free_text、single_choice、multiple_choice）に応じて
 * 異なる構造を持つ正解データを検証します。
 *
 * TypeSpecで定義されたSolution型と型互換性があります。
 *
 * @example
 * ```typescript
 * // 単一選択の場合
 * const singleChoiceSolution = {
 *   type: "single_choice",
 *   id: "solution-123",
 *   correctChoiceId: "choice-1",
 *   choices: [
 *     { id: "choice-1", solutionId: "solution-123", text: "TypeScript", orderIndex: 0 },
 *     { id: "choice-2", solutionId: "solution-123", text: "JavaScript", orderIndex: 1 }
 *   ]
 * };
 * ```
 */
export const solutionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("boolean"),
    id: z.string(),
    value: z.boolean(),
  }),
  z.object({
    type: z.literal("free_text"),
    id: z.string(),
    correctAnswer: z.string(),
    matchingStrategy: z.enum(["exact", "partial", "regex"]).default("exact"),
    caseSensitive: z.boolean().default(false),
  }),
  z.object({
    type: z.literal("single_choice"),
    id: z.string(),
    correctChoiceId: z.string(),
    choices: z.array(
      z.object({
        id: z.string(),
        solutionId: z.string(),
        text: z.string(),
        orderIndex: z.number().int(),
      }),
    ),
  }),
  z.object({
    type: z.literal("multiple_choice"),
    id: z.string(),
    correctChoiceIds: z.array(z.string()),
    minCorrectAnswers: z.number().int().default(1),
    choices: z.array(
      z.object({
        id: z.string(),
        solutionId: z.string(),
        text: z.string(),
        orderIndex: z.number().int(),
      }),
    ),
  }),
]) satisfies z.ZodType<components["schemas"]["Solution"]>;
