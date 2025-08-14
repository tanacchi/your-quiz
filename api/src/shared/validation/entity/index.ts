/**
 * Shared entity validation types and utilities.
 * Provides generic infrastructure for entity parsing with patch suggestions.
 *
 * This module abstracts validation logic away from specific entity implementations,
 * enabling consistent error handling and patch suggestion patterns across all entities.
 */

export { DraftBase } from "./DraftBase";
// Export base classes
export { EntityBase } from "./EntityBase";
// Export all types
export type {
  EntityParseError,
  EntityParseResult,
  EntityPatch,
  FieldSuggester,
  Issue,
} from "./types";
// Export all utilities
export {
  applyEntityPatch,
  applyEntityPatches,
  materializeEntityPatch,
  toIssues,
} from "./utils";
