import { describe, expect, it } from "vitest";
import type { ZodError } from "zod";
import {
  RelationType,
  type TagData,
  TagId,
  type TagInput,
  TagSchema,
  UserId,
} from "./tag-schema";

describe("Tag Schema", () => {
  const validTagData: TagInput = {
    id: "tag-123",
    name: "TypeScript",
    createdBy: "user-456",
    createdAt: "2023-12-01 10:00:00",
    relatedTags: [
      {
        relationType: "category",
        id: "tag-789",
        name: "Programming Languages",
      },
    ],
  };

  describe("Brand Types", () => {
    describe("TagId", () => {
      it.each([
        ["valid alphanumeric", "tag-123", true],
        ["valid with underscore", "tag_test", true],
        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
        ["valid single char", "t", true],
        ["empty string", "", false],
        ["only whitespace", "   ", true],
        ["null value", null, false],
        ["undefined value", undefined, false],
        ["number", 123, false],
        ["object", {}, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = TagId.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success) {
          expect(result.data).toBe(input);
        }
      });
    });

    describe("UserId", () => {
      it.each([
        ["valid format", "user-123", true],
        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
        ["valid single char", "u", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = UserId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("RelationType", () => {
      it.each([
        ["hierarchy", "hierarchy", true],
        ["category", "category", true],
        ["synonym", "synonym", true],
        ["related", "related", true],
        ["invalid type", "invalid_type", false],
        ["empty string", "", false],
        ["null value", null, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = RelationType.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });
  });

  describe("TagSchema Validation", () => {
    describe("Required Fields", () => {
      it("should accept valid complete tag data", () => {
        const result = TagSchema.safeParse(validTagData);
        expect(result.success).toBe(true);

        if (result.success) {
          const data = result.data as TagData;
          expect(data.id).toBe(validTagData.id);
          expect(data.name).toBe(validTagData.name);
          expect(data.createdBy).toBe(validTagData.createdBy);
          expect(data.createdAt).toBe(validTagData.createdAt);
          expect(data.relatedTags).toEqual(validTagData.relatedTags);
        }
      });

      it.each([
        ["id", { ...validTagData, id: undefined }],
        ["name", { ...validTagData, name: undefined }],
        ["createdBy", { ...validTagData, createdBy: undefined }],
        ["createdAt", { ...validTagData, createdAt: undefined }],
      ])("should reject missing required field: %s", (_field, invalidData) => {
        const result = TagSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
      });
    });

    describe("Name Field", () => {
      it.each([
        ["valid name", "TypeScript", true],
        ["single character", "T", true],
        ["unicode characters", "プログラミング", true],
        ["with spaces", "Programming Language", true],
        ["with special chars", "C++", true],
        ["exactly 50 chars", "A".repeat(50), true],
        ["empty string", "", false],
        ["only whitespace", "   ", true],
        ["51 chars", "A".repeat(51), false],
        ["null value", null, false],
      ])("should validate name: %s -> %s", (_desc, name, isValid) => {
        const data = { ...validTagData, name };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });
    });

    describe("RelatedTags Field", () => {
      it("should accept empty related tags array", () => {
        const dataWithEmptyRelatedTags = {
          ...validTagData,
          relatedTags: [],
        };
        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.relatedTags).toEqual([]);
        }
      });

      it("should accept null relatedTags and transform to empty array", () => {
        const dataWithNullRelatedTags = {
          ...validTagData,
          relatedTags: null,
        };
        const result = TagSchema.safeParse(dataWithNullRelatedTags);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.relatedTags).toEqual([]);
        }
      });

      it("should accept undefined relatedTags and transform to empty array", () => {
        const { relatedTags: _relatedTags, ...dataWithoutRelatedTags } =
          validTagData;
        const result = TagSchema.safeParse(dataWithoutRelatedTags);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.relatedTags).toEqual([]);
        }
      });

      it("should accept multiple related tags", () => {
        const dataWithMultipleRelatedTags = {
          ...validTagData,
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-789",
              name: "Programming Languages",
            },
            {
              relationType: "synonym" as const,
              id: "tag-999",
              name: "TS",
            },
            {
              relationType: "related" as const,
              id: "tag-111",
              name: "JavaScript",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithMultipleRelatedTags);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.relatedTags).toHaveLength(3);
        }
      });

      describe("Related Tag Object Validation", () => {
        it.each([
          ["missing relationType", { id: "tag-1", name: "Test" }],
          ["missing id", { relationType: "category", name: "Test" }],
          ["missing name", { relationType: "category", id: "tag-1" }],
          [
            "invalid relationType",
            { relationType: "invalid", id: "tag-1", name: "Test" },
          ],
          ["empty id", { relationType: "category", id: "", name: "Test" }],
          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
          [
            "51 char name",
            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
          ],
        ])(
          "should reject invalid related tag: %s",
          (_desc, invalidRelatedTag) => {
            const dataWithInvalidRelatedTag = {
              ...validTagData,
              relatedTags: [invalidRelatedTag],
            };
            const result = TagSchema.safeParse(dataWithInvalidRelatedTag);
            expect(result.success).toBe(false);
          },
        );

        it.each([
          ["hierarchy", "hierarchy"],
          ["category", "category"],
          ["synonym", "synonym"],
          ["related", "related"],
        ])("should accept valid relationType: %s", (_desc, relationType) => {
          const dataWithRelationType = {
            ...validTagData,
            relatedTags: [
              {
                relationType,
                id: "tag-test",
                name: "Test Tag",
              },
            ],
          };
          const result = TagSchema.safeParse(dataWithRelationType);
          expect(result.success).toBe(true);
        });
      });
    });

    describe("Date Validation", () => {
      it.each([
        ["SQLite format", "2023-12-01 10:00:00", true],
        ["SQLite date only", "2023-12-01", false],
        ["invalid date", "invalid-date", false],
        ["empty string", "", false],
        ["null", null, false],
      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
        const data = { ...validTagData, createdAt };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });
    });

    describe("Strict Mode", () => {
      it("should reject data with extra fields", () => {
        const dataWithExtraField = {
          ...validTagData,
          extraField: "not allowed",
        };
        const result = TagSchema.safeParse(dataWithExtraField);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("Cross-Field Validation (superRefine)", () => {
    describe("Duplicate Related Tag IDs", () => {
      it("should accept unique related tag IDs", () => {
        const dataWithUniqueRelatedTagIds = {
          ...validTagData,
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-1",
              name: "Category 1",
            },
            {
              relationType: "synonym" as const,
              id: "tag-2",
              name: "Synonym 1",
            },
            {
              relationType: "related" as const,
              id: "tag-3",
              name: "Related 1",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithUniqueRelatedTagIds);
        expect(result.success).toBe(true);
      });

      it("should reject duplicate related tag IDs", () => {
        const dataWithDuplicateRelatedTagIds = {
          ...validTagData,
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-duplicate",
              name: "Category 1",
            },
            {
              relationType: "synonym" as const,
              id: "tag-duplicate", // duplicate ID
              name: "Synonym 1",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithDuplicateRelatedTagIds);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const duplicateError = error.issues.find((issue) =>
            issue.path.includes("relatedTags"),
          );
          expect(duplicateError).toBeDefined();
          expect(duplicateError?.message).toBe(
            "Duplicate related tag IDs are not allowed",
          );
        }
      });

      it("should handle multiple duplicates", () => {
        const dataWithMultipleDuplicates = {
          ...validTagData,
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-1",
              name: "Category 1",
            },
            {
              relationType: "synonym" as const,
              id: "tag-1", // duplicate
              name: "Synonym 1",
            },
            {
              relationType: "related" as const,
              id: "tag-1", // another duplicate
              name: "Related 1",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithMultipleDuplicates);
        expect(result.success).toBe(false);
      });
    });

    describe("Self-Reference Prevention", () => {
      it("should accept tag with no self-reference", () => {
        const dataWithoutSelfReference = {
          ...validTagData,
          id: "tag-main",
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-other",
              name: "Other Tag",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithoutSelfReference);
        expect(result.success).toBe(true);
      });

      it("should reject tag that references itself", () => {
        const dataWithSelfReference = {
          ...validTagData,
          id: "tag-self",
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-self", // self-reference
              name: "Self Tag",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithSelfReference);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const selfRefError = error.issues.find((issue) =>
            issue.path.includes("relatedTags"),
          );
          expect(selfRefError).toBeDefined();
          expect(selfRefError?.message).toBe(
            "Tag cannot reference itself in related tags",
          );
        }
      });

      it("should reject multiple self-references", () => {
        const dataWithMultipleSelfReferences = {
          ...validTagData,
          id: "tag-self",
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-self", // self-reference
              name: "Self Tag 1",
            },
            {
              relationType: "synonym" as const,
              id: "tag-other",
              name: "Other Tag",
            },
            {
              relationType: "related" as const,
              id: "tag-self", // another self-reference
              name: "Self Tag 2",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithMultipleSelfReferences);
        expect(result.success).toBe(false);
      });

      it("should handle empty related tags without error", () => {
        const dataWithEmptyRelatedTags = {
          ...validTagData,
          id: "tag-lonely",
          relatedTags: [],
        };
        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
        expect(result.success).toBe(true);
      });
    });

    describe("Combined Validation Errors", () => {
      it("should report both duplicate IDs and self-reference errors", () => {
        const dataWithBothErrors = {
          ...validTagData,
          id: "tag-problem",
          relatedTags: [
            {
              relationType: "category" as const,
              id: "tag-problem", // self-reference
              name: "Problem Tag 1",
            },
            {
              relationType: "synonym" as const,
              id: "tag-dup",
              name: "Duplicate Tag 1",
            },
            {
              relationType: "related" as const,
              id: "tag-dup", // duplicate
              name: "Duplicate Tag 2",
            },
          ],
        };
        const result = TagSchema.safeParse(dataWithBothErrors);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const relatedTagsErrors = error.issues.filter((issue) =>
            issue.path.includes("relatedTags"),
          );
          expect(relatedTagsErrors).toHaveLength(2); // Both errors should be present

          const errorMessages = relatedTagsErrors.map((err) => err.message);
          expect(errorMessages).toContain(
            "Duplicate related tag IDs are not allowed",
          );
          expect(errorMessages).toContain(
            "Tag cannot reference itself in related tags",
          );
        }
      });
    });
  });

  describe("Edge Cases and Boundary Values", () => {
    describe("Name Length Boundaries", () => {
      it("should accept exactly 1 character name", () => {
        const data = { ...validTagData, name: "A" };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("should accept exactly 50 character name", () => {
        const data = { ...validTagData, name: "A".repeat(50) };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("should reject 51 character name", () => {
        const data = { ...validTagData, name: "A".repeat(51) };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });

    describe("Special Characters in Names", () => {
      it.each([
        ["special characters", "C++"],
        ["emoji", "TypeScript 🚀"],
        ["unicode", "プログラミング言語"],
        ["spaces", "Programming Language"],
        ["numbers", "TypeScript 4.9"],
        ["hyphens", "Front-End"],
        ["underscores", "Snake_Case"],
        ["dots", "Node.js"],
      ])("should accept name with %s", (_desc, name) => {
        const data = { ...validTagData, name };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    describe("Large Related Tags Arrays", () => {
      it("should handle many related tags", () => {
        const manyRelatedTags = Array.from({ length: 20 }, (_, i) => ({
          relationType: "related" as const,
          id: `tag-${i}`,
          name: `Related Tag ${i}`,
        }));

        const data = {
          ...validTagData,
          relatedTags: manyRelatedTags,
        };
        const result = TagSchema.safeParse(data);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.relatedTags).toHaveLength(20);
        }
      });
    });
  });

  describe("Integration Scenarios", () => {
    it("should handle tag with hierarchical relationships", () => {
      const hierarchicalTag = {
        id: "tag-typescript",
        name: "TypeScript",
        createdBy: "user-expert",
        createdAt: "2023-12-01 10:00:00",
        relatedTags: [
          {
            relationType: "hierarchy" as const,
            id: "tag-programming-languages",
            name: "Programming Languages",
          },
          {
            relationType: "category" as const,
            id: "tag-web-development",
            name: "Web Development",
          },
          {
            relationType: "synonym" as const,
            id: "tag-ts",
            name: "TS",
          },
          {
            relationType: "related" as const,
            id: "tag-javascript",
            name: "JavaScript",
          },
        ],
      };

      const result = TagSchema.safeParse(hierarchicalTag);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.relatedTags).toHaveLength(4);
        expect(result.data.relatedTags.map((rt) => rt.relationType)).toEqual([
          "hierarchy",
          "category",
          "synonym",
          "related",
        ]);
      }
    });

    it("should handle minimal tag without related tags", () => {
      const minimalTag = {
        id: "t",
        name: "T",
        createdBy: "u",
        createdAt: "2023-12-01 10:00:00",
      };

      const result = TagSchema.safeParse(minimalTag);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.relatedTags).toEqual([]);
      }
    });

    it("should handle tag with unicode and special characters", () => {
      const unicodeTag = {
        id: "tag-unicode-special",
        name: "C++ & プログラミング 🚀",
        createdBy: "user-international",
        createdAt: "2023-12-01 10:00:00",
        relatedTags: [
          {
            relationType: "category" as const,
            id: "tag-languages",
            name: "Programming Languages & 言語",
          },
        ],
      };

      const result = TagSchema.safeParse(unicodeTag);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.name).toContain("C++");
        expect(result.data.name).toContain("プログラミング");
        expect(result.data.name).toContain("🚀");
      }
    });
  });
});
