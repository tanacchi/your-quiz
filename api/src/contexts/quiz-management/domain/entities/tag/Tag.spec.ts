import { beforeEach, describe, expect, it } from "vitest";
import { RelationType, Tag, TagId, UserId } from "./Tag";

describe("Tag", () => {
  const validTagData = {
    id: TagId.parse("tag-1"),
    name: "JavaScript",
    createdBy: UserId.parse("user-1"),
    createdAt: "2023-12-01T10:00:00.000Z",
    relatedTags: [],
  } as const;

  describe("Brand Types", () => {
    describe("TagId validation", () => {
      it.each([
        ["valid alphanumeric", "tag-1", true],
        ["valid with numbers", "tag123", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = TagId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("UserId validation", () => {
      it.each([
        ["valid alphanumeric", "user-1", true],
        ["valid with numbers", "user123", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = UserId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("RelationType validation", () => {
      it.each([
        ["hierarchy", "hierarchy", true],
        ["category", "category", true],
        ["synonym", "synonym", true],
        ["related", "related", true],
        ["invalid type", "invalid", false],
        ["empty string", "", false],
        ["null value", null, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = RelationType.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });
  });

  describe("Entity Creation", () => {
    it("should create valid tag from complete data", () => {
      const result = Tag.from(validTagData);
      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        const tag = result.value;
        expect(tag.get("name")).toBe("JavaScript");
        expect(tag.get("createdBy")).toBe("user-1");
        expect(tag.get("relatedTags")).toEqual([]);
      }
    });

    it("should create tag with related tags", () => {
      const tagWithRelations = {
        ...validTagData,
        relatedTags: [
          {
            relationType: "hierarchy" as const,
            id: TagId.parse("tag-2"),
            name: "Programming",
          },
        ],
      };

      const result = Tag.from(tagWithRelations);
      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        const tag = result.value;
        const relations = tag.get("relatedTags");
        expect(relations).toHaveLength(1);
        expect(relations[0]?.relationType).toBe("hierarchy");
        expect(relations[0]?.name).toBe("Programming");
      }
    });

    it("should suggest patches for invalid data", () => {
      const invalidData = {
        ...validTagData,
        relatedTags: null,
      };

      const result = Tag.from(invalidData);
      expect(result.isOk()).toBe(true); // null transforms to []

      if (result.isOk()) {
        const tag = result.value;
        expect(tag.get("relatedTags")).toEqual([]);
      }
    });

    it("should reject invalid name length", () => {
      const invalidData = {
        ...validTagData,
        name: "a".repeat(51), // exceeds 50 char limit
      };

      const result = Tag.from(invalidData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const { issues } = result.error;
        expect(issues).toHaveLength(1);
        expect(issues[0]?.path).toEqual(["name"]);
      }
    });

    it("should reject empty name", () => {
      const invalidData = {
        ...validTagData,
        name: "",
      };

      const result = Tag.from(invalidData);
      expect(result.isErr()).toBe(true);
    });
  });

  describe("Validation Rules", () => {
    it("should prevent duplicate related tag IDs", () => {
      const invalidData = {
        ...validTagData,
        relatedTags: [
          {
            relationType: "hierarchy" as const,
            id: TagId.parse("tag-2"),
            name: "Programming",
          },
          {
            relationType: "category" as const,
            id: TagId.parse("tag-2"),
            name: "Programming",
          }, // same tag ID
        ],
      };

      const result = Tag.from(invalidData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const { issues } = result.error;
        expect(
          issues.some((issue) =>
            issue.message.includes("Duplicate related tag IDs"),
          ),
        ).toBe(true);
      }
    });

    it("should prevent self-reference", () => {
      const selfReferencingData = {
        ...validTagData,
        relatedTags: [
          {
            relationType: "hierarchy" as const,
            id: TagId.parse("tag-1"), // self reference
            name: "JavaScript",
          },
        ],
      };

      const result = Tag.from(selfReferencingData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const { issues } = result.error;
        expect(
          issues.some((issue) =>
            issue.message.includes("cannot reference itself"),
          ),
        ).toBe(true);
      }
    });
  });

  describe("Business Logic", () => {
    let tag: Tag;

    beforeEach(() => {
      const tagWithRelations = {
        ...validTagData,
        relatedTags: [
          {
            relationType: "hierarchy" as const,
            id: TagId.parse("tag-2"),
            name: "Programming",
          },
          {
            relationType: "category" as const,
            id: TagId.parse("tag-3"),
            name: "Web Development",
          },
        ],
      };

      const result = Tag.from(tagWithRelations);
      expect(result.isOk()).toBe(true);
      tag = result._unsafeUnwrap();
    });

    it("should get related tags by type", () => {
      const hierarchyTags = tag.getRelatedTagsByType("hierarchy");
      expect(hierarchyTags).toHaveLength(1);
      expect(hierarchyTags[0]?.name).toBe("Programming");

      const categoryTags = tag.getRelatedTagsByType("category");
      expect(categoryTags).toHaveLength(1);
      expect(categoryTags[0]?.name).toBe("Web Development");

      const synonymTags = tag.getRelatedTagsByType("synonym");
      expect(synonymTags).toHaveLength(0);
    });

    it("should check relation existence", () => {
      expect(tag.hasRelationWith(TagId.parse("tag-2"))).toBe(true);
      expect(tag.hasRelationWith(TagId.parse("tag-2"), "hierarchy")).toBe(true);
      expect(tag.hasRelationWith(TagId.parse("tag-2"), "category")).toBe(false);
      expect(tag.hasRelationWith(TagId.parse("tag-3"), "category")).toBe(true);
      expect(tag.hasRelationWith(TagId.parse("tag-999"))).toBe(false);
    });
  });

  describe("Draft Usage", () => {
    it("should work with Draft pattern", () => {
      const draft = new Tag.Draft();
      draft.update("name", "TypeScript");
      draft.with({
        id: TagId.parse("tag-typescript"),
        createdBy: UserId.parse("user-1"),
        createdAt: "2023-12-01T10:00:00.000Z",
      });

      const entityResult = draft.commit();
      expect(entityResult.isOk()).toBe(true);

      if (entityResult.isOk()) {
        const tag = entityResult.value;
        expect(tag.get("name")).toBe("TypeScript");
      }
    });

    it("should handle Draft validation errors", () => {
      const draft = new Tag.Draft();
      draft.update("name", ""); // invalid empty name

      const entityResult = draft.commit();
      expect(entityResult.isErr()).toBe(true);

      if (entityResult.isErr()) {
        const { issues } = entityResult.error;
        expect(issues.length).toBeGreaterThan(0);
        const nameError = issues.find((issue) => issue.path.includes("name"));
        expect(nameError).toBeDefined();
      }
    });

    it("should create from draft", () => {
      const draft = new Tag.Draft();
      draft.with(validTagData as Record<string, unknown>);
      const result = Tag.fromDraft(draft);
      const entity = result._unsafeUnwrap({ withStackTrace: true });
      expect(entity).toBeDefined();
    });
  });

  describe("Immutability", () => {
    it("should return new instance on updates", () => {
      const result = Tag.from(validTagData);
      expect(result.isOk()).toBe(true);
      const originalTag = result._unsafeUnwrap();

      const updatedResult = originalTag.update("name", "TypeScript");
      expect(updatedResult.isOk()).toBe(true);
      const updatedTag = updatedResult._unsafeUnwrap();

      // Different instances
      expect(originalTag).not.toBe(updatedTag);
      // Original unchanged
      expect(originalTag.get("name")).toBe("JavaScript");
      // Updated has new value
      expect(updatedTag.get("name")).toBe("TypeScript");
    });
  });
});
