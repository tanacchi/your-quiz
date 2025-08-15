import { isObjectLike } from "../../../../../shared/utils/type-guard";
import type {
  EntityPatch,
  FieldSuggester,
  Issue,
} from "../../../../../shared/validation/entity";
import type { TagInput } from "./tag-schema";

// Type alias for Tag-specific patch
export type TagPatch = EntityPatch<TagInput>;

// Type alias for Tag-specific field suggester
type TagFieldSuggester = FieldSuggester<TagInput>;

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
  if (!isObjectLike<TagInput>(input)) {
    return [];
  }

  const needsField = (field: string) =>
    issues.some((issue) => String(issue.path[0]) === field);

  const patches: TagPatch[] = [];

  if (needsField("relatedTags"))
    patches.push(...suggestRelatedTagsPatches(input.relatedTags));

  return patches;
};
