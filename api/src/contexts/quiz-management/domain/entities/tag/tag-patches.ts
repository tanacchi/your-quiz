import {
  applyEntityPatch,
  applyEntityPatches,
  type EntityPatch,
  type FieldSuggester,
  type Issue,
  materializeEntityPatch,
} from "../../../../../shared/validation/entity";
import type { TagInput } from "./tag-schema";

// Type alias for Tag-specific patch
export type TagPatch = EntityPatch<TagInput>;

// Type alias for Tag-specific field suggester
type TagFieldSuggester = FieldSuggester<TagInput>;

/** 入力データが TagInput の形に近いかを判定 */
const isTagLike = (input: unknown): input is Partial<TagInput> => {
  return typeof input === "object" && input !== null;
};

// Re-export utilities with Tag-specific names
export const materializePatch = materializeEntityPatch<TagInput>;
export const applyTagPatch = (input: unknown, patch: TagPatch): unknown =>
  applyEntityPatch(input, patch);
export const applyTagPatches = (input: unknown, patches: TagPatch[]): unknown =>
  applyEntityPatches(input, patches);

// relatedTags 用：null/undefinedハンドリング
export const suggestRelatedTagsPatches: TagFieldSuggester = (value) => {
  const patches: TagPatch[] = [];

  if (value == null) {
    patches.push({ relatedTags: [] });
  }

  return patches;
};

/** 集約：Issue に該当するフィールドだけを呼ぶ */
export const suggestTagPatches = (
  input: unknown,
  issues: Issue[],
): TagPatch[] => {
  if (!isTagLike(input)) {
    return [];
  }

  const needsField = (field: string) =>
    issues.some((issue) => String(issue.path[0]) === field);

  const patches: TagPatch[] = [];

  if (needsField("relatedTags"))
    patches.push(...suggestRelatedTagsPatches(input.relatedTags));

  return patches;
};
