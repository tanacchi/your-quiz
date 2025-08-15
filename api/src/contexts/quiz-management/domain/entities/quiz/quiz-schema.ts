import { z } from "zod";
import { dateStringOnlySchema } from "../../../../../shared/schemas/datetime.schema";
import {
  CreatorId as CreatorIdSchema,
  QuizId as QuizIdSchema,
} from "../quiz-summary/quiz-summary-schema";
import { BooleanSolutionSchema } from "../solutions/boolean/boolean-solution-schema";

// Quiz schema with BooleanSolution integration
export const QuizSchema = z
  .object({
    id: QuizIdSchema,
    question: z.string().trim().min(1).max(500),
    answerType: z.literal("boolean"), // BooleanSolution only
    solution: z.union([BooleanSolutionSchema]),
    explanation: z.string().max(1000).optional(),
    status: z.enum(["pending_approval", "approved", "rejected"]),
    creatorId: CreatorIdSchema,
    createdAt: dateStringOnlySchema,
    approvedAt: dateStringOnlySchema.optional(),
  })
  .strict()
  .superRefine((quiz, ctx) => {
    // Approved status must have approvedAt timestamp
    if (quiz.status === "approved" && !quiz.approvedAt) {
      ctx.addIssue({
        code: "custom",
        message: "Approved quiz must have approvedAt timestamp",
        path: ["approvedAt"],
      });
    }
  });

// Re-export types for public API
export type QuizData = z.output<typeof QuizSchema>;
export type QuizInput = z.input<typeof QuizSchema>;

// Re-export related types
export type { CreatorId, QuizId } from "../quiz-summary/quiz-summary-schema";
export {
  CreatorId as CreatorIdSchema,
  QuizId as QuizIdSchema,
} from "../quiz-summary/quiz-summary-schema";
