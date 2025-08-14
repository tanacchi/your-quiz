import type { z } from "zod";
import type { EntityParseResult } from "./types";

/**
 * Base class for domain entities using Self-type pattern.
 * Provides common functionality for immutable entities with type-safe operations.
 *
 * @template TEntity - The concrete entity type (self-referencing)
 * @template TSchema - The Zod schema type for validation
 *
 * @example
 * ```typescript
 * export class QuizSummary extends EntityBase<QuizSummary, typeof QuizSummarySchema> {
 *   constructor(data: QuizSummaryData) {
 *     super(data, parseQuizSummary);
 *   }
 * }
 * ```
 */
export class EntityBase<
  TEntity extends EntityBase<TEntity, TSchema>,
  TSchema extends z.ZodSchema,
> {
  protected constructor(
    private readonly data: Readonly<z.output<TSchema>>,
    private readonly parseFunction: (
      input: unknown,
    ) => EntityParseResult<TEntity, z.input<TSchema>>,
  ) {
    // Ensure complete immutability
    Object.freeze(this.data);
    Object.freeze(this);
  }

  /**
   * Returns a deep copy of the internal data.
   * Protects internal state from external modification.
   *
   * @returns Deep copy of entity data
   */
  toData(): Readonly<z.output<TSchema>> {
    return structuredClone(this.data);
  }

  /**
   * Generic getter method with full type safety.
   * Returns deep copy to prevent accidental mutations.
   *
   * @param key - The property key to get
   * @returns The value of the specified property
   */
  get<K extends keyof z.output<TSchema>>(key: K): z.output<TSchema>[K] {
    return structuredClone(this.data[key]);
  }

  /**
   * Generic update method that returns new immutable instance.
   * Validates the updated data and returns Result for error handling.
   *
   * @param key - The property key to update
   * @param value - The new value for the property
   * @returns EntityParseResult containing new entity instance or parse error
   */
  update<K extends keyof z.input<TSchema>>(
    key: K,
    value: z.input<TSchema>[K],
  ): EntityParseResult<TEntity, z.input<TSchema>> {
    const newData = { ...this.data, [key]: value };
    return this.parseFunction(newData);
  }

  /**
   * Updates multiple fields at once, returns new instance.
   * Validates the patched data and returns Result for error handling.
   *
   * @param patch - Partial object with fields to update
   * @returns EntityParseResult containing new entity instance or parse error
   */
  with(
    patch: Partial<z.input<TSchema>>,
  ): EntityParseResult<TEntity, z.input<TSchema>> {
    const newData = { ...this.data, ...patch };
    return this.parseFunction(newData);
  }

  /**
   * Updates using mutator function with deep cloning, returns new instance.
   * Provides imperative-style updates while maintaining immutability.
   *
   * Uses z.output<TSchema> for editing since the user works with constructed entity state.
   *
   * @param mutator - Function that receives a mutable copy of the current entity data
   * @returns EntityParseResult containing new entity instance or parse error
   */
  withMutator(
    mutator: (draft: z.output<TSchema>) => void,
  ): EntityParseResult<TEntity, z.input<TSchema>> {
    const draftData = this.toData() as z.output<TSchema>;
    mutator(draftData);
    return this.parseFunction(draftData);
  }
}
