import { z } from "zod";
import { SolutionId } from "../../quiz-summary/quiz-summary-schema";

// Main BooleanSolution schema with minimal validation
export const BooleanSolutionSchema = z
  .object({
    id: SolutionId,
    value: z.boolean(),
  })
  .strict();

export type BooleanSolutionData = z.output<typeof BooleanSolutionSchema>;
export type BooleanSolutionInput = z.input<typeof BooleanSolutionSchema>;
