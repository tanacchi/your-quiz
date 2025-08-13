import { err, ok, type Result } from "neverthrow";
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
        code: z.ZodIssueCode.custom,
        message: "Approved quiz must have approvedAt timestamp",
        path: ["approvedAt"],
      });
    }

    // Duplicate tagIds check
    const uniqueTagIds = new Set(quiz.tagIds);
    if (uniqueTagIds.size !== quiz.tagIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Duplicate tag IDs are not allowed",
        path: ["tagIds"],
      });
    }
  });

export type QuizSummaryDTO = z.output<typeof QuizSummarySchema>;
export type QuizSummaryInput = z.input<typeof QuizSummarySchema>;

// Utility type for partial updates
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * QuizSummary Entity - Immutable domain entity for quiz summary data
 *
 * This entity represents a quiz in summary form (without detailed tag information).
 * It follows strict immutability - all update operations return new instances.
 * Uses branded types for type safety and Result type for error handling.
 *
 * @example
 * ```typescript
 * const quizResult = QuizSummary.from({
 *   id: "quiz-123",
 *   question: "What is TypeScript?",
 *   answerType: "single_choice",
 *   solutionId: "solution-456",
 *   // ... other fields
 * });
 *
 * if (quizResult.isOk()) {
 *   const quiz = quizResult.value;
 *   const updated = quiz.set('question', 'Updated question').unwrap();
 * }
 * ```
 */
export class QuizSummary {
  private constructor(private readonly data: Readonly<QuizSummaryDTO>) {
    // Ensure complete immutability
    Object.freeze(this.data);
    Object.freeze(this);
  }

  /**
   * Creates a QuizSummary instance from unknown input with validation
   *
   * @param input - The input data to validate and convert
   * @returns Result containing QuizSummary instance or ZodError
   */
  static from(input: unknown): Result<QuizSummary, z.ZodError> {
    const result = QuizSummarySchema.safeParse(input);
    if (!result.success) {
      return err(result.error);
    }
    return ok(new QuizSummary(result.data));
  }

  /**
   * Creates a QuizSummary instance with external tag validation
   * Used when tagIds need to be validated against external data source
   *
   * @param input - The input data to validate
   * @param validateTagIds - Function to validate tag IDs existence
   * @returns Promise<Result<QuizSummary, Error>>
   */
  static fromWithValidation(
    input: unknown,
    validateTagIds: (tagIds: TagId[]) => Promise<Result<void, Error>>,
  ): Promise<Result<QuizSummary, Error>> {
    const parseResult = QuizSummarySchema.safeParse(input);
    if (!parseResult.success) {
      return Promise.resolve(
        err(
          new Error(`Schema validation failed: ${parseResult.error.message}`),
        ),
      );
    }

    return validateTagIds(parseResult.data.tagIds).then((validationResult) => {
      if (validationResult.isErr()) {
        return err(validationResult.error);
      }
      return ok(new QuizSummary(parseResult.data));
    });
  }

  /**
   * Creates a QuizSummary from Draft instance
   *
   * @param draft - The draft instance to convert
   * @returns Result containing QuizSummary instance or ZodError
   */
  static fromDraft(draft: QuizSummaryDraft): Result<QuizSummary, z.ZodError> {
    return QuizSummary.from(draft.state);
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
   * Generic setter method that returns new immutable instance
   *
   * @param key - The property key to set
   * @param value - The new value for the property
   * @returns Result containing new QuizSummary instance or ZodError
   */
  set<K extends keyof QuizSummaryInput>(
    key: K,
    value: QuizSummaryInput[K],
  ): Result<QuizSummary, z.ZodError> {
    const newData = { ...this.data, [key]: value };
    return QuizSummary.from(newData);
  }

  /**
   * Updates multiple fields at once, returns new instance
   *
   * @param patch - Partial object with fields to update
   * @returns Result containing new QuizSummary instance or ZodError
   */
  with(patch: DeepPartial<QuizSummaryInput>): Result<QuizSummary, z.ZodError> {
    const newData = { ...this.data, ...patch };
    return QuizSummary.from(newData);
  }

  /**
   * Updates using mutator function with deep cloning, returns new instance
   *
   * @param mutator - Function that receives a mutable copy of the data
   * @returns Result containing new QuizSummary instance or ZodError
   */
  withMutator(
    mutator: (draft: QuizSummaryInput) => void,
  ): Result<QuizSummary, z.ZodError> {
    const draftData = structuredClone(this.data);
    mutator(draftData);
    return QuizSummary.from(draftData);
  }

  // Fluent API convenience setters
  setQuestion(question: string): Result<QuizSummary, z.ZodError> {
    return this.set("question", question);
  }

  setAnswerType(
    answerType: QuizSummaryInput["answerType"],
  ): Result<QuizSummary, z.ZodError> {
    return this.set("answerType", answerType);
  }

  setExplanation(explanation: string): Result<QuizSummary, z.ZodError> {
    return this.set("explanation", explanation);
  }

  setStatus(
    status: QuizSummaryInput["status"],
  ): Result<QuizSummary, z.ZodError> {
    return this.set("status", status);
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
   * @returns Result containing approved QuizSummary or Error
   */
  approve(approvedAt: string): Result<QuizSummary, Error> {
    if (this.get("status") !== "pending_approval") {
      return err(
        new Error(`Quiz with status ${this.get("status")} cannot be approved`),
      );
    }

    return this.with({
      status: "approved",
      approvedAt,
    }).mapErr((zodErr) => new Error(`Validation failed: ${zodErr.message}`));
  }

  // Tag operations (immutable)

  /**
   * Adds a tag ID to the quiz
   *
   * @param tagId - The tag ID to add
   * @returns Result containing new QuizSummary with added tag or Error
   */
  addTag(tagId: TagId): Result<QuizSummary, Error> {
    const currentTagIds = this.get("tagIds");
    if (currentTagIds.includes(tagId)) {
      return err(new Error(`Tag ${tagId} already exists`));
    }
    return this.set("tagIds", [...currentTagIds, tagId]).mapErr(
      (zodErr) => new Error(`Validation failed: ${zodErr.message}`),
    );
  }

  /**
   * Removes a tag ID from the quiz
   *
   * @param tagId - The tag ID to remove
   * @returns Result containing new QuizSummary with removed tag or Error
   */
  removeTag(tagId: TagId): Result<QuizSummary, Error> {
    const currentTagIds = this.get("tagIds");
    const newTagIds = currentTagIds.filter((id) => id !== tagId);
    if (newTagIds.length === currentTagIds.length) {
      return err(new Error(`Tag ${tagId} not found`));
    }
    return this.set("tagIds", newTagIds).mapErr(
      (zodErr) => new Error(`Validation failed: ${zodErr.message}`),
    );
  }

  /**
   * Adds multiple tag IDs to the quiz
   *
   * @param tagIds - Array of tag IDs to add
   * @returns Result containing new QuizSummary with added tags or Error
   */
  addTags(tagIds: TagId[]): Result<QuizSummary, Error> {
    const currentTagIds = this.get("tagIds");
    const duplicates = tagIds.filter((id) => currentTagIds.includes(id));
    if (duplicates.length > 0) {
      return err(new Error(`Tags already exist: ${duplicates.join(", ")}`));
    }
    return this.set("tagIds", [...currentTagIds, ...tagIds]).mapErr(
      (zodErr) => new Error(`Validation failed: ${zodErr.message}`),
    );
  }

  /**
   * Removes multiple tag IDs from the quiz
   *
   * @param tagIds - Array of tag IDs to remove
   * @returns Result containing new QuizSummary with removed tags or Error
   */
  removeTags(tagIds: TagId[]): Result<QuizSummary, Error> {
    const currentTagIds = this.get("tagIds");
    const newTagIds = currentTagIds.filter((id) => !tagIds.includes(id));
    return this.set("tagIds", newTagIds).mapErr(
      (zodErr) => new Error(`Validation failed: ${zodErr.message}`),
    );
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
   * Generic setter for draft state with validation
   *
   * @param key - The property key to set
   * @param value - The value to set
   */
  set<K extends keyof QuizSummaryInput>(
    key: K,
    value: QuizSummaryInput[K],
  ): void {
    this.state = { ...this.state, [key]: value };
    this.validatePartial();
  }

  /**
   * Sets multiple fields at once
   *
   * @param patch - Partial object with fields to update
   */
  setMany(patch: DeepPartial<QuizSummaryInput>): void {
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
   * @returns Result containing QuizSummary or ZodError
   */
  commit(): Result<QuizSummary, z.ZodError> {
    return QuizSummary.from(this.state);
  }

  /**
   * Adds a tag ID to the draft
   *
   * @param tagId - The tag ID to add
   */
  addTagId(tagId: TagId): void {
    const currentTagIds = this.get("tagIds") || [];
    if (!currentTagIds.includes(tagId)) {
      this.set("tagIds", [...currentTagIds, tagId]);
    }
  }

  /**
   * Removes a tag ID from the draft
   *
   * @param tagId - The tag ID to remove
   */
  removeTagId(tagId: TagId): void {
    const currentTagIds = this.get("tagIds") || [];
    this.set(
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
