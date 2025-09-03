import { err, ok } from "neverthrow";
import {
  DraftBase,
  EntityBase,
  type EntityParseError,
  type EntityParseResult,
  toIssues,
} from "../../../../../shared/validation/entity";
import { suggestTagPatches } from "./tag-patches";
import {
  type RelationType,
  type TagData,
  type TagId,
  type TagInput,
  TagSchema,
} from "./tag-schema";

// Type aliases for Tag-specific types
export type TagParseError = EntityParseError<TagInput>;
export type TagParseResult = EntityParseResult<Tag, TagInput>;

// Backward compatibility alias (will be removed after test migration)
export type TagDraft = InstanceType<typeof Tag.Draft>;

// Re-export types for public API
export type {
  RelationType as RelationTypeType,
  TagData,
  TagId as TagIdType,
  TagInput,
  UserId as UserIdType,
} from "./tag-schema";

// Re-export runtime brand schemas
export {
  RelationType,
  TagId,
  UserId,
} from "./tag-schema";

/**
 * parseTag: エンティティの統一エントリーポイント
 * - 成功: ok(Tag)
 * - 失敗: err({ issues, patches })
 *   - patches は候補のみ、採用判断は呼び出し側
 */
export function parseTag(input: unknown): TagParseResult {
  const parsed = TagSchema.safeParse(input);
  if (parsed.success) return ok(Tag.build(parsed.data));

  const issues = toIssues(parsed.error);
  const patches = suggestTagPatches(input, issues);
  return err({ kind: "parse", issues, patches });
}

/**
 * Tag Entity - Immutable domain entity for tag management
 *
 * This entity represents a tag that can be used for categorizing quizzes.
 * It supports hierarchical relationships and various relation types.
 * Uses branded types for type safety and Result type for error handling.
 *
 * @example
 * ```typescript
 * const tagResult = parseTag({
 *   id: "tag-123",
 *   name: "JavaScript",
 *   createdBy: "user-456",
 *   createdAt: "2023-12-01T10:00:00.000Z",
 *   relatedTags: []
 * });
 *
 * if (tagResult.isOk()) {
 *   const tag = tagResult.value;
 *   const tagName = tag.get("name");
 * } else {
 *   // Patch adoption example
 *   const recoveredInput = applyTagPatches(input, tagResult.error.patches);
 *   const retryResult = parseTag(recoveredInput);
 * }
 * ```
 */
export class Tag extends EntityBase<Tag, typeof TagSchema> {
  constructor(data: TagData) {
    super(data, parseTag);
  }

  /** Internal factory method for validated data */
  static build(data: TagData): Tag {
    return new Tag(data);
  }

  /**
   * Creates a Tag instance from unknown input with parsing
   *
   * @param input - The input data to parse and convert
   * @returns TagParseResult containing Tag instance or TagParseError
   */
  static from(input: unknown): TagParseResult {
    return parseTag(input);
  }

  /**
   * Creates a Tag from Draft instance (delegates to Draft.commit)
   *
   * @param draft - The draft instance to convert
   * @returns TagParseResult containing Tag instance or TagParseError
   */
  static fromDraft(draft: InstanceType<typeof Tag.Draft>): TagParseResult {
    return draft.commit();
  }

  // Business logic methods (minimal for Tag entity)

  /**
   * Gets all related tags by relation type
   *
   * @param relationType - The type of relationship to filter by
   * @returns Array of related tags with the specified relation type
   */
  getRelatedTagsByType(
    relationType: RelationType,
  ): Array<{ id: TagId; name: string }> {
    return this.get("relatedTags")
      .filter((rel) => rel.relationType === relationType)
      .map((rel) => ({ id: rel.id, name: rel.name }));
  }

  /**
   * Checks if this tag has a relation with another tag
   *
   * @param tagId - The ID of the tag to check
   * @param relationType - Optional relation type to check for specific type
   * @returns true if relation exists, false otherwise
   */
  hasRelationWith(tagId: TagId, relationType?: RelationType): boolean {
    return this.get("relatedTags").some((rel) => {
      const matchesId = rel.id === tagId;
      const matchesType = !relationType || rel.relationType === relationType;
      return matchesId && matchesType;
    });
  }

  /**
   * Draft class extending DraftBase with Self-type pattern.
   * Provides unified ParseError interface and patch system integration.
   */
  static Draft = class extends DraftBase<Tag, typeof TagSchema> {
    constructor() {
      super(parseTag);
    }
  };
}
