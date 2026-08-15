import { z } from "zod";
import type { components } from "../../types/generated/api";
import { solutionCreateSchema } from "./solution.schema";

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
    solution: solutionCreateSchema,
    explanation: z.string().nullish(),
    tags: z.array(z.string()).nullish(),
    isDraft: z.boolean().nullish(),
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
    isDraft: data.isDraft ?? false,
  })) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

/**
 * クイズ部分更新リクエスト用Zodスキーマ（PATCH /quizzes/{id}）
 *
 * question/explanationのみ更新可能（ADR-0027）。少なくとも一方の指定が必須。
 *
 * 注: `satisfies z.ZodType<UpdateQuizRequest>` は付与していない。tsconfigの
 * `exactOptionalPropertyTypes: true` 下では、Zodの`.optional()`が生成する型
 * （`T | undefined`）と、生成型の`foo?: T`（値が存在しないかTのみを許容し、
 * 明示的なundefinedは許容しない）が構造的に一致せずビルドエラーになるため
 * （Zod・TypeScript間の既知の制約。実行時の省略キー扱いは仕様どおり）。
 * quiz.schema.spec.tsのランタイムテストで型互換性を検証している。
 */
export const updateQuizSchema = z
  .object({
    question: z.string().min(1).optional(),
    explanation: z.string().optional(),
  })
  .refine(
    (data) => data.question !== undefined || data.explanation !== undefined,
    { message: "At least one of question or explanation must be provided" },
  );

/**
 * クイズ承認・却下リクエスト用Zodスキーマ（POST /quizzes/{id}/approve, /reject）
 *
 * 注: updateQuizSchemaと同じ理由でsatisfies句は付与していない。
 */
export const approvalRequestSchema = z.object({
  decision: z.enum(["approved", "rejected"]),
  reviewerNotes: z.string().optional(),
  publishImmediately: z.boolean().optional(),
});
