import { z } from "zod";

// Brand types for type safety
export const QuizId = z.string().min(1).brand<"QuizId">();
export type QuizId = z.infer<typeof QuizId>;

export const SolutionId = z.string().min(1).brand<"SolutionId">();
export type SolutionId = z.infer<typeof SolutionId>;

export const CreatorId = z.string().min(1).brand<"CreatorId">();
export type CreatorId = z.infer<typeof CreatorId>;

export const TagId = z.string().min(1).brand<"TagId">();
export type TagId = z.infer<typeof TagId>;

// Tag interface for future QuizDetail use
export interface TagDetail {
  id: TagId;
  name: string;
}

// QuizSummary schema with flat structure
export const QuizSummarySchema = z
  .object({
    id: QuizId,
    question: z.string().min(1),
    answerType: z.enum([
      "boolean",
      "free_text",
      "single_choice",
      "multiple_choice",
    ]),
    solutionId: SolutionId,
    explanation: z.string().optional(),
    tagIds: z.array(TagId).default([]),
    status: z.enum(["pending_approval", "approved", "rejected"]),
    creatorId: CreatorId,
    createdAt: z.string().datetime(),
    approvedAt: z.string().datetime().optional(),
  })
  .strict()
  .superRefine((quiz, ctx) => {
    // Cross-field constraint: approved quiz must have approvedAt
    if (quiz.status === "approved" && !quiz.approvedAt) {
      ctx.addIssue({
        code: "custom",
        message: "Approved quiz must have approvedAt timestamp",
        path: ["approvedAt"],
      });
    }

    // Duplicate tagIds check
    const uniqueTagIds = new Set(quiz.tagIds);
    if (uniqueTagIds.size !== quiz.tagIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate tag IDs are not allowed",
        path: ["tagIds"],
      });
    }
  });

export type QuizSummaryDTO = z.output<typeof QuizSummarySchema>;
export type QuizSummaryInput = z.input<typeof QuizSummarySchema>;
