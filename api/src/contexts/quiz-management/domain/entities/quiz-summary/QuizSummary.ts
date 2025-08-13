import { Result, ok, err } from "neverthrow";
import { z } from "zod";
import {
  QuizSummarySchema,
  type QuizSummaryDTO,
  type QuizSummaryInput,
  type TagDetail,
  type TagId,
} from "./quiz-summary-schema";
import {
  type Issue,
  type QuizSummaryPatch,
  suggestQuizSummaryPatches,
  applyQuizSummaryPatch,
  applyQuizSummaryPatches,
  materializePatch,
} from "./quiz-summary-patches";

// Re-export types for public API
export type {
  TagDetail,
  QuizSummaryDTO,
  QuizSummaryInput,
} from "./quiz-summary-schema";
export type { QuizSummaryPatch, Issue } from "./quiz-summary-patches";

// Re-export runtime brand schemas and their types
export {
  QuizId,
  SolutionId,
  CreatorId,
  TagId,
} from "./quiz-summary-schema";
export type {
  QuizId as QuizIdType,
  SolutionId as SolutionIdType,
  CreatorId as CreatorIdType,
  TagId as TagIdType,
} from "./quiz-summary-schema";

// Re-export utilities
export {
  applyQuizSummaryPatch,
  applyQuizSummaryPatches,
  materializePatch,
};

/** ValidationError: Issue と Patch 候補のみ返す（採用判断は呼び出し側） */
export type ValidationError = {
  kind: 'validation';
  issues: Issue[];
  patches: QuizSummaryPatch[]; // 空配列可
};

/** 成功: QuizSummary, 失敗: ValidationError */
export type ValidationResult = Result<QuizSummary, ValidationError>;

// Utility type for partial updates
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** ZodError → Issue[] への縮約（公開境界に Zod を出さない） */
const toIssues = (e: z.ZodError): Issue[] =>
  e.issues.map(i => ({
    path: i.path.map(p => typeof p === 'symbol' ? p.toString() : p) as (string | number)[],
    code: i.code,
    message: i.message
  }));

/**
 * validateQuizSummary:
 * - 成功: ok(QuizSummary)
 * - 失敗: err({ issues, patches })
 *   - patches は「候補」であり、採用可否は呼び出し側が決める
 */
export function validateQuizSummary(input: unknown): ValidationResult {
  const parsed = QuizSummarySchema.safeParse(input);
  if (parsed.success) return ok(QuizSummary.build(parsed.data));

  const issues = toIssues(parsed.error);
  const patches = suggestQuizSummaryPatches(input, issues);
  return err({ kind: 'validation', issues, patches });
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
export class QuizSummary {
  private constructor(private readonly data: Readonly<QuizSummaryDTO>) {
    // Ensure complete immutability
    Object.freeze(this.data);
    Object.freeze(this);
  }

  /** Internal factory method for validated data */
  static build(data: QuizSummaryDTO): QuizSummary {
    return new QuizSummary(data);
  }

  /**
   * Creates a QuizSummary instance from unknown input with validation
   *
   * @param input - The input data to validate and convert
   * @returns ValidationResult containing QuizSummary instance or ValidationError
   */
  static from(input: unknown): ValidationResult {
    return validateQuizSummary(input);
  }

  /**
   * Creates a QuizSummary from Draft instance
   *
   * @param draft - The draft instance to convert
   * @returns ValidationResult containing QuizSummary instance or ValidationError
   */
  static fromDraft(draft: QuizSummaryDraft): ValidationResult {
    return validateQuizSummary(draft.state);
  }

  /**
   * Returns a deep copy of the internal data
   *
   * @returns Deep copy of QuizSummaryDTO
   */
  toDTO(): QuizSummaryDTO {
    // Return deep copy to protect internal data
    return structuredClone(this.data);
  }

  /**
   * Generic getter method with full type safety
   *
   * @param key - The property key to get
   * @returns The value of the specified property
   */
  get<K extends keyof QuizSummaryDTO>(key: K): QuizSummaryDTO[K] {
    return this.data[key];
  }

  /**
   * Generic update method that returns new immutable instance
   * Renamed from 'set' to avoid impression of destructive mutation
   *
   * @param key - The property key to update
   * @param value - The new value for the property
   * @returns ValidationResult containing new QuizSummary instance or ValidationError
   */
  update<K extends keyof QuizSummaryInput>(
    key: K,
    value: QuizSummaryInput[K],
  ): ValidationResult {
    const newData = { ...this.data, [key]: value };
    return validateQuizSummary(newData);
  }

  /**
   * Updates multiple fields at once, returns new instance
   *
   * @param patch - Partial object with fields to update
   * @returns ValidationResult containing new QuizSummary instance or ValidationError
   */
  with(patch: DeepPartial<QuizSummaryInput>): ValidationResult {
    const newData = { ...this.data, ...patch };
    return validateQuizSummary(newData);
  }

  /**
   * Updates using mutator function with deep cloning, returns new instance
   *
   * @param mutator - Function that receives a mutable copy of the data
   * @returns ValidationResult containing new QuizSummary instance or ValidationError
   */
  withMutator(
    mutator: (draft: QuizSummaryInput) => void,
  ): ValidationResult {
    const draftData = structuredClone(this.data);
    mutator(draftData);
    return validateQuizSummary(draftData);
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
   * @returns ValidationResult containing approved QuizSummary or ValidationError
   */
  approve(approvedAt: string): ValidationResult {
    if (this.get("status") !== "pending_approval") {
      const error: ValidationError = {
        kind: "validation",
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
   * @returns ValidationResult containing new QuizSummary with added tag or ValidationError
   */
  addTag(tagId: TagId): ValidationResult {
    const currentTagIds = this.get("tagIds");
    if (currentTagIds.includes(tagId)) {
      const error: ValidationError = {
        kind: "validation",
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
   * @returns ValidationResult containing new QuizSummary with removed tag or ValidationError
   */
  removeTag(tagId: TagId): ValidationResult {
    const currentTagIds = this.get("tagIds");
    const newTagIds = currentTagIds.filter((id) => id !== tagId);
    if (newTagIds.length === currentTagIds.length) {
      const error: ValidationError = {
        kind: "validation",
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
   * @returns ValidationResult containing new QuizSummary with added tags or ValidationError
   */
  addTags(tagIds: TagId[]): ValidationResult {
    const currentTagIds = this.get("tagIds");
    const duplicates = tagIds.filter((id) => currentTagIds.includes(id));
    if (duplicates.length > 0) {
      const error: ValidationError = {
        kind: "validation",
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
   * @returns ValidationResult containing new QuizSummary with removed tags or ValidationError
   */
  removeTags(tagIds: TagId[]): ValidationResult {
    const currentTagIds = this.get("tagIds");
    const newTagIds = currentTagIds.filter((id) => !tagIds.includes(id));
    return this.update("tagIds", newTagIds);
  }
}

/**
 * Draft class for mutable editing before committing to immutable entity
 * Used for form editing and partial validation scenarios
 */
export class QuizSummaryDraft {
  state: Partial<QuizSummaryInput> = {};
  errors: Record<string, string[]> = {};

  /**
   * Generic getter for draft state
   *
   * @param key - The property key to get
   * @returns The value or undefined if not set
   */
  get<K extends keyof QuizSummaryInput>(
    key: K,
  ): QuizSummaryInput[K] | undefined {
    return this.state[key];
  }

  /**
   * Generic update method for draft state with validation
   * Renamed from 'set' to maintain consistency with main entity
   *
   * @param key - The property key to update
   * @param value - The value to update
   */
  update<K extends keyof QuizSummaryInput>(
    key: K,
    value: QuizSummaryInput[K],
  ): void {
    this.state = { ...this.state, [key]: value };
    this.validatePartial();
  }

  /**
   * Updates multiple fields at once
   *
   * @param patch - Partial object with fields to update
   */
  updateMany(patch: DeepPartial<QuizSummaryInput>): void {
    this.state = { ...this.state, ...patch };
    this.validatePartial();
  }

  /**
   * Validates the current state and updates errors
   */
  private validatePartial(): void {
    const result = QuizSummarySchema.safeParse(this.state);
    if (!result.success) {
      this.errors = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!this.errors[path]) {
          this.errors[path] = [];
        }
        this.errors[path].push(issue.message);
      }
    } else {
      this.errors = {};
    }
  }

  /**
   * Commits the draft to a QuizSummary entity
   *
   * @returns ValidationResult containing QuizSummary or ValidationError
   */
  commit(): ValidationResult {
    return validateQuizSummary(this.state);
  }

  /**
   * Adds a tag ID to the draft
   *
   * @param tagId - The tag ID to add
   */
  addTagId(tagId: TagId): void {
    const currentTagIds = this.get("tagIds") || [];
    if (!currentTagIds.includes(tagId)) {
      this.update("tagIds", [...currentTagIds, tagId]);
    }
  }

  /**
   * Removes a tag ID from the draft
   *
   * @param tagId - The tag ID to remove
   */
  removeTagId(tagId: TagId): void {
    const currentTagIds = this.get("tagIds") || [];
    this.update(
      "tagIds",
      currentTagIds.filter((id) => id !== tagId),
    );
  }

  /**
   * Clears all errors (useful for form reset)
   */
  clearErrors(): void {
    this.errors = {};
  }

  /**
   * Checks if the draft has any validation errors
   *
   * @returns true if there are errors, false otherwise
   */
  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Gets errors for a specific field path
   *
   * @param path - The field path (dot notation)
   * @returns Array of error messages for the field
   */
  getErrors(path: string): string[] {
    return this.errors[path] || [];
  }
}
