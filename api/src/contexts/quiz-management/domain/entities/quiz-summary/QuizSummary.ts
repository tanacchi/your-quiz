import { err, ok } from "neverthrow";
import {
  DraftBase,
  EntityBase,
  type EntityParseError,
  type EntityParseResult,
  toIssues,
} from "../../../../../shared/validation/entity";
import { suggestQuizSummaryPatches } from "./quiz-summary-patches";
import {
  type QuizSummaryData,
  type QuizSummaryInput,
  QuizSummarySchema,
  type TagId,
} from "./quiz-summary-schema";

// Type aliases for QuizSummary-specific types
export type QuizSummaryParseError = EntityParseError<QuizSummaryInput>;
export type QuizSummaryParseResult = EntityParseResult<
  QuizSummary,
  QuizSummaryInput
>;

// Backward compatibility alias (will be removed after test migration)
export type QuizSummaryDraft = InstanceType<typeof QuizSummary.Draft>;

// Re-export shared types and utilities
export type { Issue } from "../../../../../shared/validation/entity";
export {
  applyEntityPatch,
  applyEntityPatches,
  materializeEntityPatch,
} from "../../../../../shared/validation/entity";

// Re-export types for public API
export type {
  CreatorId as CreatorIdType,
  QuizId as QuizIdType,
  QuizSummaryData,
  QuizSummaryInput,
  SolutionId as SolutionIdType,
  TagDetail,
  TagId as TagIdType,
} from "./quiz-summary-schema";
// Re-export runtime brand schemas and their types
export {
  CreatorId,
  QuizId,
  SolutionId,
  TagId,
} from "./quiz-summary-schema";

// Utility type for partial updates
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * parseQuizSummary:
 * - 成功: ok(QuizSummary)
 * - 失敗: err({ issues, patches })
 *   - patches は「候補」であり、採用可否は呼び出し側が決める
 */
export function parseQuizSummary(input: unknown): QuizSummaryParseResult {
  const parsed = QuizSummarySchema.safeParse(input);
  if (parsed.success) return ok(QuizSummary.build(parsed.data));

  const issues = toIssues(parsed.error);
  const patches = suggestQuizSummaryPatches(input, issues);
  return err({ kind: "parse", issues, patches });
}

/**
 * QuizSummary Entity - Immutable domain entity for quiz summary data
 *
 * This entity represents a quiz in summary form (without detailed tag information).
 * It follows strict immutability - all update operations return new instances.
 * Uses branded types for type safety and Result type for error handling.
 *
 * @example
 * ```typescript
 * const quizResult = validateQuizSummary({
 *   id: "quiz-123",
 *   question: "What is TypeScript?",
 *   answerType: "single_choice",
 *   solutionId: "solution-456",
 *   // ... other fields
 * });
 *
 * if (quizResult.isOk()) {
 *   const quiz = quizResult.value;
 *   const updated = quiz.update('question', 'Updated question');
 * } else {
 *   // Patch adoption example
 *   const recoveredInput = applyQuizSummaryPatches(input, quizResult.error.patches);
 *   const retryResult = validateQuizSummary(recoveredInput);
 * }
 * ```
 */
export class QuizSummary extends EntityBase<
  QuizSummary,
  typeof QuizSummarySchema
> {
  constructor(data: QuizSummaryData) {
    super(data, parseQuizSummary);
  }

  /** Internal factory method for validated data */
  static build(data: QuizSummaryData): QuizSummary {
    return new QuizSummary(data);
  }

  /**
   * Creates a QuizSummary instance from unknown input with parsing
   *
   * @param input - The input data to parse and convert
   * @returns QuizSummaryParseResult containing QuizSummary instance or QuizSummaryParseError
   */
  static from(input: unknown): QuizSummaryParseResult {
    return parseQuizSummary(input);
  }

  /**
   * Creates a QuizSummary from Draft instance (delegates to Draft.commit)
   *
   * @param draft - The draft instance to convert
   * @returns QuizSummaryParseResult containing QuizSummary instance or QuizSummaryParseError
   */
  static fromDraft(
    draft: InstanceType<typeof QuizSummary.Draft>,
  ): QuizSummaryParseResult {
    return draft.commit();
  }

  // Business logic methods

  /**
   * Checks if the quiz can be updated
   *
   * @returns true if status is 'pending_approval', false otherwise
   */
  canBeUpdated(): boolean {
    return this.get("status") === "pending_approval";
  }

  /**
   * Checks if the quiz can be deleted
   *
   * @returns true if status is not 'approved', false otherwise
   */
  canBeDeleted(): boolean {
    return this.get("status") !== "approved";
  }

  /**
   * Approves the quiz with timestamp
   *
   * @param approvedAt - The approval timestamp
   * @returns QuizSummaryParseResult containing approved QuizSummary or QuizSummaryParseError
   */
  approve(approvedAt: string): QuizSummaryParseResult {
    if (this.get("status") !== "pending_approval") {
      const error: QuizSummaryParseError = {
        kind: "parse",
        issues: [
          {
            path: ["status"],
            code: "custom",
            message: `Quiz with status ${this.get("status")} cannot be approved`,
          },
        ],
        patches: [],
      };
      return err(error);
    }

    return this.with({
      status: "approved",
      approvedAt,
    });
  }

  // Tag operations (immutable)

  /**
   * Adds a tag ID to the quiz
   *
   * @param tagId - The tag ID to add
   * @returns QuizSummaryParseResult containing new QuizSummary with added tag or QuizSummaryParseError
   */
  addTag(tagId: TagId): QuizSummaryParseResult {
    const currentTagIds = this.get("tagIds");
    if (currentTagIds.includes(tagId)) {
      const error: QuizSummaryParseError = {
        kind: "parse",
        issues: [
          {
            path: ["tagIds"],
            code: "custom",
            message: `Tag ${tagId} already exists`,
          },
        ],
        patches: [],
      };
      return err(error);
    }
    return this.update("tagIds", [...currentTagIds, tagId]);
  }

  /**
   * Removes a tag ID from the quiz
   *
   * @param tagId - The tag ID to remove
   * @returns QuizSummaryParseResult containing new QuizSummary with removed tag or QuizSummaryParseError
   */
  removeTag(tagId: TagId): QuizSummaryParseResult {
    const currentTagIds = this.get("tagIds");
    const newTagIds = currentTagIds.filter((id) => id !== tagId);
    if (newTagIds.length === currentTagIds.length) {
      const error: QuizSummaryParseError = {
        kind: "parse",
        issues: [
          {
            path: ["tagIds"],
            code: "custom",
            message: `Tag ${tagId} not found`,
          },
        ],
        patches: [],
      };
      return err(error);
    }
    return this.update("tagIds", newTagIds);
  }

  /**
   * Adds multiple tag IDs to the quiz
   *
   * @param tagIds - Array of tag IDs to add
   * @returns QuizSummaryParseResult containing new QuizSummary with added tags or QuizSummaryParseError
   */
  addTags(tagIds: TagId[]): QuizSummaryParseResult {
    const currentTagIds = this.get("tagIds");
    const duplicates = tagIds.filter((id) => currentTagIds.includes(id));
    if (duplicates.length > 0) {
      const error: QuizSummaryParseError = {
        kind: "parse",
        issues: [
          {
            path: ["tagIds"],
            code: "custom",
            message: `Tags already exist: ${duplicates.join(", ")}`,
          },
        ],
        patches: [],
      };
      return err(error);
    }
    return this.update("tagIds", [...currentTagIds, ...tagIds]);
  }

  /**
   * Removes multiple tag IDs from the quiz
   *
   * @param tagIds - Array of tag IDs to remove
   * @returns QuizSummaryParseResult containing new QuizSummary with removed tags or QuizSummaryParseError
   */
  removeTags(tagIds: TagId[]): QuizSummaryParseResult {
    const currentTagIds = this.get("tagIds");
    const newTagIds = currentTagIds.filter((id) => !tagIds.includes(id));
    return this.update("tagIds", newTagIds);
  }

  /**
   * Draft class extending DraftBase with Self-type pattern.
   * Provides unified ParseError interface and patch system integration.
   */
  static Draft = class extends DraftBase<
    QuizSummary,
    typeof QuizSummarySchema
  > {
    constructor() {
      super(parseQuizSummary);
    }
  };
}
