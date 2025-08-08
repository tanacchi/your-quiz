import { z } from "zod";
import type { components } from "../../types/generated/api";
import { solutionSchema } from "./solution.schema";

// Quiz作成リクエスト用Zodスキーマ
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
