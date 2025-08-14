import type { z } from "zod";
import type { EntityPatch, Issue } from "./types";

/**
 * Materializes a patch by converting lazy functions to actual partial data.
 *
 * @template TInput - The input type for the entity
 * @param patch - The patch to materialize
 * @returns The materialized partial data
 */
export const materializeEntityPatch = <TInput>(
  patch: EntityPatch<TInput>,
): Partial<TInput> => (typeof patch === "function" ? patch() : patch);

/**
 * Applies a single patch to input data with type-safe merging.
 *
 * @template TInput - The input type for the entity
 * @param input - The input data to patch
 * @param patch - The patch to apply
 * @returns The patched data
 */
export const applyEntityPatch = <TInput>(
  input: unknown,
  patch: EntityPatch<TInput>,
): unknown => {
  const base = isEntityLike<TInput>(input) ? { ...input } : {};
  const patchData = materializeEntityPatch(patch);
  return { ...base, ...patchData };
};

/**
 * Applies multiple patches sequentially (later patches override earlier ones).
 *
 * @template TInput - The input type for the entity
 * @param input - The input data to patch
 * @param patches - Array of patches to apply
 * @returns The patched data
 */
export const applyEntityPatches = <TInput>(
  input: unknown,
  patches: EntityPatch<TInput>[],
): unknown =>
  patches.reduce((acc, patch) => applyEntityPatch(acc, patch), input);

/**
 * Converts Zod error to generic Issue array.
 * Abstracts away Zod-specific error details from domain layer.
 *
 * @param error - The Zod error to convert
 * @returns Array of generic Issue objects
 */
export const toIssues = (error: z.ZodError): Issue[] =>
  error.issues.map((issue) => ({
    path: issue.path.map((p) => (typeof p === "symbol" ? p.toString() : p)) as (
      | string
      | number
    )[],
    code: issue.code,
    message: issue.message,
  }));

/**
 * Type guard to check if input data resembles entity input structure.
 * Used to safely apply patches without runtime errors.
 *
 * @template TInput - The input type for the entity
 * @param input - The data to check
 * @returns Type predicate indicating if input is entity-like
 */
const isEntityLike = <TInput>(input: unknown): input is Partial<TInput> => {
  return typeof input === "object" && input !== null;
};
