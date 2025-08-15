import { err, ok } from "neverthrow";
import {
  DraftBase,
  EntityBase,
  type EntityParseError,
  type EntityParseResult,
  toIssues,
} from "../../../../../shared/validation/entity";
import { BooleanSolution } from "../solutions/boolean/BooleanSolution";
import { suggestQuizPatches } from "./quiz-patches";
import { type QuizData, type QuizInput, QuizSchema } from "./quiz-schema";

// Type aliases for Quiz-specific types
export type QuizParseError = EntityParseError<QuizInput>;
export type QuizParseResult = EntityParseResult<Quiz, QuizInput>;

// Backward compatibility alias (will be removed after test migration)
export type QuizDraft = InstanceType<typeof Quiz.Draft>;

// Re-export types for public API
export type {
  CreatorId as CreatorIdType,
  QuizData,
  QuizId as QuizIdType,
  QuizInput,
} from "./quiz-schema";

// Re-export runtime brand schemas
export {
  CreatorIdSchema as CreatorId,
  QuizIdSchema as QuizId,
} from "./quiz-schema";

/**
 * parseQuiz: エンティティの統一エントリーポイント
 * - 成功: ok(Quiz)
 * - 失敗: err({ issues, patches })
 *   - patches は候補のみ、採用判断は呼び出し側
 */
export function parseQuiz(input: unknown): QuizParseResult {
  const parsed = QuizSchema.safeParse(input);
  if (parsed.success) return ok(Quiz.build(parsed.data));

  const issues = toIssues(parsed.error);
  const patches = suggestQuizPatches(input, issues);
  return err({ kind: "parse", issues, patches });
}

/**
 * Quiz Entity - Immutable domain entity for quiz management with BooleanSolution integration
 *
 * This entity represents a complete quiz with integrated BooleanSolution.
 * It supports approval workflow, tag management, and answer checking functionality.
 * Uses branded types for type safety and Result type for error handling.
 *
 * @example
 * ```typescript
 * const quizResult = parseQuiz({
 *   id: "quiz-123",
 *   question: "Is TypeScript a superset of JavaScript?",
 *   answerType: "boolean",
 *   solution: { id: "solution-456", value: true },
 *   explanation: "TypeScript adds static typing to JavaScript",
 *   status: "pending_approval",
 *   creatorId: "user-789",
 *   createdAt: "2023-12-01T10:00:00.000Z"
 * });
 *
 * if (quizResult.isOk()) {
 *   const quiz = quizResult.value;
 *   const solution = quiz.getSolution();
 *   const isCorrect = solution.checkAnswer({ value: true });
 * } else {
 *   console.error("Validation failed:", quizResult.error.issues);
 * }
 * ```
 */
export class Quiz extends EntityBase<Quiz, typeof QuizSchema> {
  constructor(data: QuizData) {
    super(data, parseQuiz);
  }

  /** Internal factory method for validated data */
  static build(data: QuizData): Quiz {
    return new Quiz(data);
  }

  /**
   * Creates a Quiz instance from unknown input with parsing
   *
   * @param input - The input data to parse and convert
   * @returns QuizParseResult containing Quiz instance or QuizParseError
   */
  static from(input: unknown): QuizParseResult {
    return parseQuiz(input);
  }

  /**
   * Creates a Quiz from Draft instance (delegates to Draft.commit)
   *
   * @param draft - The draft instance to convert
   * @returns QuizParseResult containing Quiz instance or QuizParseError
   */
  static fromDraft(draft: InstanceType<typeof Quiz.Draft>): QuizParseResult {
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
   * @returns QuizParseResult containing approved Quiz or QuizParseError
   */
  approve(approvedAt: string): QuizParseResult {
    if (this.get("status") !== "pending_approval") {
      const error: QuizParseError = {
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

  /**
   * Rejects the quiz
   *
   * @param _reason - Optional rejection reason (unused in current implementation)
   * @returns QuizParseResult containing rejected Quiz or QuizParseError
   */
  reject(_reason?: string): QuizParseResult {
    if (this.get("status") !== "pending_approval") {
      const error: QuizParseError = {
        kind: "parse",
        issues: [
          {
            path: ["status"],
            code: "custom",
            message: `Quiz with status ${this.get("status")} cannot be rejected`,
          },
        ],
        patches: [],
      };
      return err(error);
    }

    return this.update("status", "rejected");
  }

  // Solution integration methods

  /**
   * Gets the integrated BooleanSolution
   *
   * @returns BooleanSolution instance
   */
  getSolution(): BooleanSolution {
    const solutionData = this.get("solution");
    return BooleanSolution.build(solutionData);
  }

  // Quiz validation methods

  /**
   * Checks if all required fields are set
   *
   * @returns true if quiz is complete, false otherwise
   */
  isComplete(): boolean {
    const data = this.toData();
    return Boolean(
      data.id &&
        data.question.trim() &&
        data.answerType &&
        data.solution &&
        data.status &&
        data.creatorId &&
        data.createdAt,
    );
  }

  /**
   * Checks if quiz is ready for approval
   *
   * @returns true if ready for approval, false otherwise
   */
  isReadyForApproval(): boolean {
    return (
      this.isComplete() &&
      this.get("status") === "pending_approval" &&
      this.get("question").length >= 5 // Minimum question length
    );
  }

  /**
   * Validates content consistency between question, solution, and explanation
   *
   * @returns validation result with issues
   */
  validateContentConsistency(): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    const question = this.get("question");
    const explanation = this.get("explanation");
    const answerType = this.get("answerType");

    // Check answerType consistency
    if (answerType !== "boolean") {
      issues.push(`Answer type must be 'boolean', got '${answerType}'`);
    }

    // Check question quality
    if (question.length < 5) {
      issues.push("Question is too short (minimum 5 characters)");
    }

    if (
      !question.includes("?") &&
      !question.toLowerCase().includes("true") &&
      !question.toLowerCase().includes("false")
    ) {
      issues.push(
        "Boolean question should be a question or contain true/false reference",
      );
    }

    // Check explanation quality if provided
    if (explanation && explanation.length < 10) {
      issues.push(
        "Explanation is too short (minimum 10 characters when provided)",
      );
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }

  /**
   * Draft class extending DraftBase with Self-type pattern.
   * Provides unified ParseError interface and patch system integration.
   */
  static Draft = class extends DraftBase<Quiz, typeof QuizSchema> {
    constructor() {
      super(parseQuiz);
    }
  };
}
