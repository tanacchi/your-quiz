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
export const solutionSchema = z
  .discriminatedUnion("type", [
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
  ])
  .superRefine((data, ctx) => {
    // Boolean solution validation
    if (data.type === "boolean") {
      if (!("value" in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solution type 'boolean' requires 'value' field",
          path: ["value"],
        });
      }

      const invalidFields = [];
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");
      if ("choices" in data) invalidFields.push("choices");
      if ("correctChoiceId" in data) invalidFields.push("correctChoiceId");
      if ("correctChoiceIds" in data) invalidFields.push("correctChoiceIds");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Solution type 'boolean' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Free text solution validation
    else if (data.type === "free_text") {
      if (!("correctAnswer" in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solution type 'free_text' requires 'correctAnswer' field",
          path: ["correctAnswer"],
        });
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("choices" in data) invalidFields.push("choices");
      if ("correctChoiceId" in data) invalidFields.push("correctChoiceId");
      if ("correctChoiceIds" in data) invalidFields.push("correctChoiceIds");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Solution type 'free_text' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Single choice solution validation
    else if (data.type === "single_choice") {
      if (!("correctChoiceId" in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Solution type 'single_choice' requires 'correctChoiceId' field",
          path: ["correctChoiceId"],
        });
      }

      if (!("choices" in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solution type 'single_choice' requires 'choices' array",
          path: ["choices"],
        });
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");
      if ("correctChoiceIds" in data) invalidFields.push("correctChoiceIds");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Solution type 'single_choice' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Multiple choice solution validation
    else if (data.type === "multiple_choice") {
      if (!("correctChoiceIds" in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Solution type 'multiple_choice' requires 'correctChoiceIds' array",
          path: ["correctChoiceIds"],
        });
      }

      if (!("choices" in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solution type 'multiple_choice' requires 'choices' array",
          path: ["choices"],
        });
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");
      if ("correctChoiceId" in data) invalidFields.push("correctChoiceId");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Solution type 'multiple_choice' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }
  }) satisfies z.ZodType<components["schemas"]["Solution"]>;
