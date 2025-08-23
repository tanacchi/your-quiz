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
 *   choices: [
 *     { id: "choice-1", solutionId: "solution-123", text: "TypeScript", orderIndex: 0, isCorrect: true },
 *     { id: "choice-2", solutionId: "solution-123", text: "JavaScript", orderIndex: 1, isCorrect: false }
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
      choices: z.array(
        z.object({
          id: z.string(),
          solutionId: z.string(),
          text: z.string(),
          orderIndex: z.number().int(),
          isCorrect: z.boolean(),
        }),
      ),
    }),
    z.object({
      type: z.literal("multiple_choice"),
      id: z.string(),
      minCorrectAnswers: z.number().int().default(1),
      choices: z.array(
        z.object({
          id: z.string(),
          solutionId: z.string(),
          text: z.string(),
          orderIndex: z.number().int(),
          isCorrect: z.boolean(),
        }),
      ),
    }),
  ])
  .superRefine((data, ctx) => {
    // Boolean solution validation
    if (data.type === "boolean") {
      if (!("value" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'boolean' requires 'value' field",
          path: ["value"],
        });
      }

      const invalidFields = [];
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");
      if ("choices" in data) invalidFields.push("choices");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'boolean' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Free text solution validation
    else if (data.type === "free_text") {
      if (!("correctAnswer" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'free_text' requires 'correctAnswer' field",
          path: ["correctAnswer"],
        });
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("choices" in data) invalidFields.push("choices");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'free_text' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Single choice solution validation
    else if (data.type === "single_choice") {
      if (!("choices" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'single_choice' requires 'choices' array",
          path: ["choices"],
        });
      }

      // Validate that exactly one choice is marked as correct
      if ("choices" in data && Array.isArray(data.choices)) {
        const correctChoices = data.choices.filter(
          (choice: { isCorrect?: boolean }) => choice.isCorrect === true,
        );
        if (correctChoices.length !== 1) {
          ctx.addIssue({
            code: "custom",
            message:
              "Single choice solution must have exactly one correct choice (isCorrect: true)",
            path: ["choices"],
          });
        }
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'single_choice' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Multiple choice solution validation
    else if (data.type === "multiple_choice") {
      if (!("choices" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'multiple_choice' requires 'choices' array",
          path: ["choices"],
        });
      }

      // Validate that at least minCorrectAnswers choices are marked as correct
      if ("choices" in data && Array.isArray(data.choices)) {
        const correctChoices = data.choices.filter(
          (choice: { isCorrect?: boolean }) => choice.isCorrect === true,
        );
        const minCorrect =
          "minCorrectAnswers" in data &&
          typeof data.minCorrectAnswers === "number"
            ? data.minCorrectAnswers
            : 1;

        if (correctChoices.length < minCorrect) {
          ctx.addIssue({
            code: "custom",
            message: `Multiple choice solution must have at least ${minCorrect} correct choices (isCorrect: true)`,
            path: ["choices"],
          });
        }

        if (correctChoices.length === 0) {
          ctx.addIssue({
            code: "custom",
            message:
              "Multiple choice solution must have at least one correct choice (isCorrect: true)",
            path: ["choices"],
          });
        }
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'multiple_choice' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }
  }) satisfies z.ZodType<components["schemas"]["Solution"]>;

/**
 * クイズ作成用正解データ用Zodスキーマ（IDフィールドなし）
 *
 * クイズ作成時の正解情報を検証するためのZodスキーマです。
 * Solution型からID関連フィールドを除いたSolutionCreate型に対応します。
 *
 * TypeSpecで定義されたSolutionCreate型と型互換性があります。
 */
export const solutionCreateSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal("boolean"),
      value: z.boolean(),
    }),
    z.object({
      type: z.literal("free_text"),
      correctAnswer: z.string(),
      matchingStrategy: z.enum(["exact", "partial", "regex"]).default("exact"),
      caseSensitive: z.boolean().default(false),
    }),
    z.object({
      type: z.literal("single_choice"),
      choices: z.array(
        z.object({
          text: z.string(),
          orderIndex: z.number().int(),
          isCorrect: z.boolean(),
        }),
      ),
    }),
    z.object({
      type: z.literal("multiple_choice"),
      minCorrectAnswers: z.number().int().default(1),
      choices: z.array(
        z.object({
          text: z.string(),
          orderIndex: z.number().int(),
          isCorrect: z.boolean(),
        }),
      ),
    }),
  ])
  .superRefine((data, ctx) => {
    // Boolean solution validation
    if (data.type === "boolean") {
      if (!("value" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'boolean' requires 'value' field",
          path: ["value"],
        });
      }

      const invalidFields = [];
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");
      if ("choices" in data) invalidFields.push("choices");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'boolean' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Free text solution validation
    else if (data.type === "free_text") {
      if (!("correctAnswer" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'free_text' requires 'correctAnswer' field",
          path: ["correctAnswer"],
        });
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("choices" in data) invalidFields.push("choices");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'free_text' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Single choice solution validation
    else if (data.type === "single_choice") {
      if (!("choices" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'single_choice' requires 'choices' array",
          path: ["choices"],
        });
      }

      // Validate that exactly one choice is marked as correct
      if ("choices" in data && Array.isArray(data.choices)) {
        const correctChoices = data.choices.filter(
          (choice: { isCorrect?: boolean }) => choice.isCorrect === true,
        );
        if (correctChoices.length !== 1) {
          ctx.addIssue({
            code: "custom",
            message:
              "Single choice solution must have exactly one correct choice (isCorrect: true)",
            path: ["choices"],
          });
        }
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'single_choice' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }

    // Multiple choice solution validation
    else if (data.type === "multiple_choice") {
      if (!("choices" in data)) {
        ctx.addIssue({
          code: "custom",
          message: "Solution type 'multiple_choice' requires 'choices' array",
          path: ["choices"],
        });
      }

      // Validate that at least minCorrectAnswers choices are marked as correct
      if ("choices" in data && Array.isArray(data.choices)) {
        const correctChoices = data.choices.filter(
          (choice: { isCorrect?: boolean }) => choice.isCorrect === true,
        );
        const minCorrect =
          "minCorrectAnswers" in data &&
          typeof data.minCorrectAnswers === "number"
            ? data.minCorrectAnswers
            : 1;

        if (correctChoices.length < minCorrect) {
          ctx.addIssue({
            code: "custom",
            message: `Multiple choice solution must have at least ${minCorrect} correct choices (isCorrect: true)`,
            path: ["choices"],
          });
        }

        if (correctChoices.length === 0) {
          ctx.addIssue({
            code: "custom",
            message:
              "Multiple choice solution must have at least one correct choice (isCorrect: true)",
            path: ["choices"],
          });
        }
      }

      const invalidFields = [];
      if ("value" in data) invalidFields.push("value");
      if ("correctAnswer" in data) invalidFields.push("correctAnswer");

      if (invalidFields.length > 0 && invalidFields[0]) {
        ctx.addIssue({
          code: "custom",
          message: `Solution type 'multiple_choice' should not contain '${invalidFields.join("', '")}' field${invalidFields.length > 1 ? "s" : ""}`,
          path: [invalidFields[0]],
        });
      }
    }
  }) satisfies z.ZodType<components["schemas"]["SolutionCreate"]>;
