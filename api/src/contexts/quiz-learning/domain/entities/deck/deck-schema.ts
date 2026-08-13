import { z } from "zod";
import { sqliteDateTimeSchema } from "../../../../../shared/schemas/datetime.schema";

// Brand types for type safety
export const DeckId = z.string().min(1).brand<"DeckId">();
export type DeckId = z.infer<typeof DeckId>;

export const CreatorId = z.string().min(1).brand<"DeckCreatorId">();
export type CreatorId = z.infer<typeof CreatorId>;

// quiz-management の QuizId とは別に、Deck視点での参照用ローカルbrand型として定義する
// （境界づけられたコンテキスト間の型直接共有を避けるため。値としてはquiz-managementのQuizIdと同一形式）
export const QuizId = z.string().min(1).brand<"DeckQuizId">();
export type QuizId = z.infer<typeof QuizId>;

export const DeckSchema = z
  .object({
    id: DeckId,
    name: z.string().trim().min(1).max(200),
    description: z.string().max(1000).optional(),
    quizIds: z.array(QuizId).min(1),
    creatorId: CreatorId,
    createdAt: sqliteDateTimeSchema,
    lastModifiedAt: sqliteDateTimeSchema,
  })
  .strict()
  .superRefine((deck, ctx) => {
    const uniqueQuizIds = new Set(deck.quizIds);
    if (uniqueQuizIds.size !== deck.quizIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate quiz IDs are not allowed",
        path: ["quizIds"],
      });
    }
  });

export type DeckData = z.output<typeof DeckSchema>;
export type DeckInput = z.input<typeof DeckSchema>;
