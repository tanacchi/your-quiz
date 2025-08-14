import type { z } from "zod";
import type {
  EntityParseError,
  EntityParseResult,
  EntityPatch,
  Issue,
} from "./types";
import { applyEntityPatches } from "./utils";

/**
 * Base class for entity drafts using Self-type pattern.
 * Provides mutable editing capabilities before committing to immutable entities.
 * Integrates with the patch system for error correction suggestions.
 *
 * @template TEntity - The target entity type to be created
 * @template TSchema - The Zod schema type for validation
 *
 * @example
 * ```typescript
 * static Draft = class extends DraftBase<QuizSummary, typeof QuizSummarySchema> {
 *   constructor() {
 *     super(parseQuizSummary);
 *   }
 * };
 * ```
 */
export class DraftBase<TEntity, TSchema extends z.ZodSchema> {
  state: Partial<z.input<TSchema>> = {};
  private lastParseResult?: EntityParseResult<TEntity, z.input<TSchema>>;

  constructor(
    private readonly parseFunction: (
      input: unknown,
    ) => EntityParseResult<TEntity, z.input<TSchema>>,
  ) {}

  /**
   * Primary validation method - commits draft to entity (Draft's responsibility).
   * Stores the result for error introspection and patch suggestions.
   *
   * @returns EntityParseResult containing entity instance or parse error
   */
  commit(): EntityParseResult<TEntity, z.input<TSchema>> {
    this.lastParseResult = this.parseFunction(this.state);
    return this.lastParseResult;
  }

  /**
   * Real-time validation (alias for commit).
   * Provides immediate feedback during form editing.
   *
   * @returns EntityParseResult for immediate validation feedback
   */
  validate(): EntityParseResult<TEntity, z.input<TSchema>> {
    return this.commit();
  }

  /**
   * Gets the last parse error if validation failed.
   * Provides access to structured error information.
   *
   * @returns EntityParseError or null if no errors
   */
  getParseError(): EntityParseError<z.input<TSchema>> | null {
    return this.lastParseResult?.isErr() ? this.lastParseResult.error : null;
  }

  /**
   * Gets structured validation issues.
   * Abstracts away Zod-specific error details.
   *
   * @returns Array of Issue objects from last validation
   */
  getIssues(): Issue[] {
    const error = this.getParseError();
    return error ? error.issues : [];
  }

  /**
   * Gets patch suggestions for fixing validation errors.
   * Integrates with the minimalist validation design.
   *
   * @returns Array of patch suggestions
   */
  getPatches(): EntityPatch<z.input<TSchema>>[] {
    const error = this.getParseError();
    return error ? error.patches : [];
  }

  /**
   * Applies patch suggestions to fix validation errors.
   * Enables automatic error correction workflows.
   *
   * @param patches - Array of patches to apply
   */
  applyPatches(patches: EntityPatch<z.input<TSchema>>[]): void {
    this.state = applyEntityPatches(this.state, patches) as Partial<
      z.input<TSchema>
    >;
    this.validate(); // Re-validate after applying patches
  }

  /**
   * Updates single field with automatic validation.
   * Provides real-time feedback during form editing.
   *
   * @param key - The property key to update
   * @param value - The value to update
   */
  update<K extends keyof z.input<TSchema>>(
    key: K,
    value: z.input<TSchema>[K],
  ): void {
    this.state = { ...this.state, [key]: value };
    this.validate();
  }

  /**
   * Updates multiple fields at once with automatic validation.
   * Efficient for batch updates during form submission.
   *
   * @param patch - Partial object with fields to update
   */
  with(patch: Partial<z.input<TSchema>>): void {
    this.state = { ...this.state, ...patch };
    this.validate();
  }

  /**
   * Generic getter for draft state.
   * Returns deep copy to prevent accidental mutations.
   *
   * @param key - The property key to get
   * @returns The value or undefined if not set
   */
  get<K extends keyof z.input<TSchema>>(
    key: K,
  ): z.input<TSchema>[K] | undefined {
    return structuredClone(this.state[key]);
  }

  /**
   * Clears validation state (useful for form reset).
   * Removes cached validation results.
   */
  clearErrors(): void {
    delete this.lastParseResult;
  }

  /**
   * Checks if the draft has any validation errors.
   * Convenient boolean check for form validation state.
   *
   * @returns true if there are validation errors, false otherwise
   */
  hasErrors(): boolean {
    return this.getIssues().length > 0;
  }

  /**
   * Gets errors for a specific field path (backward compatibility).
   * Maintains compatibility with existing form validation patterns.
   *
   * @param path - The field path (dot notation)
   * @returns Array of error messages for the field
   */
  getErrors(path: string): string[] {
    const issues = this.getIssues();
    return issues
      .filter((issue) => issue.path.join(".") === path)
      .map((issue) => issue.message);
  }
}
