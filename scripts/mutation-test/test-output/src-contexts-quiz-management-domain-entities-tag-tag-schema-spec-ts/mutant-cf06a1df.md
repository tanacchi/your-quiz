# Mutant cf06a1df Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6921
**Stable ID**: cf06a1df
**Location**: L80:42–L266:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6921
@@ -76,196 +76,10 @@
       });
     });
   });
 
-  describe("TagSchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid complete tag data", () => {
-        const result = TagSchema.safeParse(validTagData);
-        expect(result.success).toBe(true);
+  describe("TagSchema Validation", () => {});
 
-        if (result.success) {
-          const data = result.data as TagData;
-          expect(data.id).toBe(validTagData.id);
-          expect(data.name).toBe(validTagData.name);
-          expect(data.createdBy).toBe(validTagData.createdBy);
-          expect(data.createdAt).toBe(validTagData.createdAt);
-          expect(data.relatedTags).toEqual(validTagData.relatedTags);
-        }
-      });
-
-      it.each([
-        ["id", { ...validTagData, id: undefined }],
-        ["name", { ...validTagData, name: undefined }],
-        ["createdBy", { ...validTagData, createdBy: undefined }],
-        ["createdAt", { ...validTagData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = TagSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
-    });
-
-    describe("Name Field", () => {
-      it.each([
-        ["valid name", "TypeScript", true],
-        ["single character", "T", true],
-        ["unicode characters", "プログラミング", true],
-        ["with spaces", "Programming Language", true],
-        ["with special chars", "C++", true],
-        ["exactly 50 chars", "A".repeat(50), true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["51 chars", "A".repeat(51), false],
-        ["null value", null, false],
-      ])("should validate name: %s -> %s", (_desc, name, isValid) => {
-        const data = { ...validTagData, name };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("RelatedTags Field", () => {
-      it("should accept empty related tags array", () => {
-        const dataWithEmptyRelatedTags = {
-          ...validTagData,
-          relatedTags: [],
-        };
-        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
-      });
-
-      it("should accept null relatedTags and transform to empty array", () => {
-        const dataWithNullRelatedTags = {
-          ...validTagData,
-          relatedTags: null,
-        };
-        const result = TagSchema.safeParse(dataWithNullRelatedTags);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
-      });
-
-      it("should accept undefined relatedTags and transform to empty array", () => {
-        const { relatedTags: _relatedTags, ...dataWithoutRelatedTags } =
-          validTagData;
-        const result = TagSchema.safeParse(dataWithoutRelatedTags);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
-      });
-
-      it("should accept multiple related tags", () => {
-        const dataWithMultipleRelatedTags = {
-          ...validTagData,
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-789",
-              name: "Programming Languages",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-999",
-              name: "TS",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-111",
-              name: "JavaScript",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithMultipleRelatedTags);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.relatedTags).toHaveLength(3);
-        }
-      });
-
-      describe("Related Tag Object Validation", () => {
-        it.each([
-          ["missing relationType", { id: "tag-1", name: "Test" }],
-          ["missing id", { relationType: "category", name: "Test" }],
-          ["missing name", { relationType: "category", id: "tag-1" }],
-          [
-            "invalid relationType",
-            { relationType: "invalid", id: "tag-1", name: "Test" },
-          ],
-          ["empty id", { relationType: "category", id: "", name: "Test" }],
-          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
-          [
-            "51 char name",
-            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
-          ],
-        ])(
-          "should reject invalid related tag: %s",
-          (_desc, invalidRelatedTag) => {
-            const dataWithInvalidRelatedTag = {
-              ...validTagData,
-              relatedTags: [invalidRelatedTag],
-            };
-            const result = TagSchema.safeParse(dataWithInvalidRelatedTag);
-            expect(result.success).toBe(false);
-          },
-        );
-
-        it.each([
-          ["hierarchy", "hierarchy"],
-          ["category", "category"],
-          ["synonym", "synonym"],
-          ["related", "related"],
-        ])("should accept valid relationType: %s", (_desc, relationType) => {
-          const dataWithRelationType = {
-            ...validTagData,
-            relatedTags: [
-              {
-                relationType,
-                id: "tag-test",
-                name: "Test Tag",
-              },
-            ],
-          };
-          const result = TagSchema.safeParse(dataWithRelationType);
-          expect(result.success).toBe(true);
-        });
-      });
-    });
-
-    describe("Date Validation", () => {
-      it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validTagData, createdAt };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validTagData,
-          extraField: "not allowed",
-        };
-        const result = TagSchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
-    });
-  });
-
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Duplicate Related Tag IDs", () => {
       it("should accept unique related tag IDs", () => {
         const dataWithUniqueRelatedTagIds = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
