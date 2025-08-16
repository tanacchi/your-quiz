import type { Result } from "neverthrow";

/**
 * Issue represents a validation problem with path, code, and message.
 * Used to abstract away Zod-specific error details from the domain layer.
 */
export type Issue = {
  path: (string | number)[];
  code: string;
  message: string;
};

/**
 * Generic entity patch type for suggesting corrections.
 * Can be either static data or a lazy function for deferred computation.
 *
 * @template TInput - The input type for the entity (typically z.input<Schema>)
 */
export type EntityPatch<TInput> = Partial<TInput> | (() => Partial<TInput>);

/**
 * Generic entity parse error containing issues and patch suggestions.
 * Follows the minimalist validation design - suggests but doesn't auto-correct.
 *
 * @template TInput - The input type for the entity (typically z.input<Schema>)
 */
export type EntityParseError<TInput> = {
  kind: "parse" | "invalid_state";
  issues: Issue[];
  patches: EntityPatch<TInput>[];
};

/**
 * Generic result type for entity parsing operations.
 *
 * @template TEntity - The entity type (e.g., QuizSummary)
 * @template TInput - The input type for the entity (typically z.input<Schema>)
 */
export type EntityParseResult<TEntity, TInput> = Result<
  TEntity,
  EntityParseError<TInput>
>;

/**
 * Type for field-specific suggestion functions.
 * Takes an unknown value and returns an array of patch suggestions.
 *
 * @template TInput - The input type for the entity (typically z.input<Schema>)
 */
export type FieldSuggester<TInput> = (value: unknown) => EntityPatch<TInput>[];
