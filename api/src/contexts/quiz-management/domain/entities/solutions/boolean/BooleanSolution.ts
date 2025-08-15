import { err, ok } from "neverthrow";
import {
  DraftBase,
  EntityBase,
  type EntityParseError,
  type EntityParseResult,
  type EntityPatch,
  toIssues,
} from "../../../../../../shared/validation/entity";
import {
  type BooleanSolutionData,
  type BooleanSolutionInput,
  BooleanSolutionSchema,
} from "./boolean-solution-schema";

// Type aliases for BooleanSolution-specific types
export type BooleanSolutionPatch = EntityPatch<BooleanSolutionInput>;
export type BooleanSolutionParseError = EntityParseError<BooleanSolutionInput>;
export type BooleanSolutionParseResult = EntityParseResult<
  BooleanSolution,
  BooleanSolutionInput
>;

// Backward compatibility alias (will be removed after test migration)
export type BooleanSolutionDraft = InstanceType<typeof BooleanSolution.Draft>;

// Re-export shared types and utilities
export type { Issue } from "../../../../../../shared/validation/entity";
export {
  applyEntityPatch,
  applyEntityPatches,
  materializeEntityPatch,
} from "../../../../../../shared/validation/entity";
// Re-export runtime brand schemas
export { SolutionId } from "../../quiz-summary/quiz-summary-schema";
// Re-export types for public API
export type {
  BooleanSolutionData,
  BooleanSolutionInput,
} from "./boolean-solution-schema";

/**
 * parseBooleanSolution: エンティティの統一エントリーポイント
 * - 成功: ok(BooleanSolution)
 * - 失敗: err({ issues, patches })
 *   - patches は空配列（パッチシステム不使用）
 */
export function parseBooleanSolution(
  input: unknown,
): BooleanSolutionParseResult {
  const parsed = BooleanSolutionSchema.safeParse(input);
  if (parsed.success) return ok(BooleanSolution.build(parsed.data));

  const issues = toIssues(parsed.error);
  return err({ kind: "parse", issues, patches: [] });
}

/**
 * BooleanSolution Entity - Immutable domain entity for boolean quiz solutions
 *
 * This entity represents a boolean solution (true/false) for quiz questions.
 * It supports answer checking functionality for future integration with Attempt entities.
 * Uses branded types for type safety and Result type for error handling.
 *
 * @example
 * ```typescript
 * const solutionResult = parseBooleanSolution({
 *   id: "solution-123",
 *   value: true
 * });
 *
 * if (solutionResult.isOk()) {
 *   const solution = solutionResult.value;
 *   const isCorrect = solution.isTrue();
 *   const checkResult = solution.checkAnswer({ value: true });
 * } else {
 *   console.error("Validation failed:", solutionResult.error.issues);
 * }
 * ```
 */
export class BooleanSolution extends EntityBase<
  BooleanSolution,
  typeof BooleanSolutionSchema
> {
  constructor(data: BooleanSolutionData) {
    super(data, parseBooleanSolution);
  }

  /** Internal factory method for validated data */
  static build(data: BooleanSolutionData): BooleanSolution {
    return new BooleanSolution(data);
  }

  /**
   * Creates a BooleanSolution instance from unknown input with parsing
   *
   * @param input - The input data to parse and convert
   * @returns BooleanSolutionParseResult containing BooleanSolution instance or BooleanSolutionParseError
   */
  static from(input: unknown): BooleanSolutionParseResult {
    return parseBooleanSolution(input);
  }

  /**
   * Creates a BooleanSolution from Draft instance (delegates to Draft.commit)
   *
   * @param draft - The draft instance to convert
   * @returns BooleanSolutionParseResult containing BooleanSolution instance or BooleanSolutionParseError
   */
  static fromDraft(
    draft: InstanceType<typeof BooleanSolution.Draft>,
  ): BooleanSolutionParseResult {
    return draft.commit();
  }

  // Business logic methods

  /**
   * Checks if the solution value is true
   *
   * @returns true if the solution value is true, false otherwise
   */
  isTrue(): boolean {
    return this.get("value") === true;
  }

  /**
   * Checks if the solution value is false
   *
   * @returns true if the solution value is false, false otherwise
   */
  isFalse(): boolean {
    return this.get("value") === false;
  }

  /**
   * Creates a new BooleanSolution instance with negated value
   *
   * @returns BooleanSolutionParseResult with negated value
   */
  negate(): BooleanSolutionParseResult {
    return this.update("value", !this.get("value"));
  }

  /**
   * Checks if the given attempt matches this solution (future Attempt integration)
   *
   * @param attempt - The attempt data to check against this solution
   * @returns boolean indicating if the attempt is correct (currently always false - placeholder)
   */
  checkAnswer(attempt: unknown): boolean {
    console.log("BooleanSolution.checkAnswer: NotImplemented", {
      solutionId: this.get("id"),
      expectedValue: this.get("value"),
      attempt,
    });

    // 暫定実装: 常にfalseを返す
    // TODO: Attemptエンティティ実装後に正式な判定ロジックを実装
    return false;
  }

  /**
   * Draft class extending DraftBase with Self-type pattern.
   * Provides unified ParseError interface and patch system integration.
   */
  static Draft = class extends DraftBase<
    BooleanSolution,
    typeof BooleanSolutionSchema
  > {
    constructor() {
      super(parseBooleanSolution);
    }
  };
}
