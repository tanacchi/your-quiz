import { z } from "zod";
import type { components } from "../../types/generated/api";

// TypeSpec由来の型を活用したSolution Zodスキーマ定義
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
