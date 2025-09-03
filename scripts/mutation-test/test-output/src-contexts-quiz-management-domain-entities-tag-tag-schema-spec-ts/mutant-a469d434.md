# Mutant a469d434 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6992
**Stable ID**: a469d434
**Location**: L126:41–L240:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6992
@@ -122,124 +122,10 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("RelatedTags Field", () => {
-      it("should accept empty related tags array", () => {
-        const dataWithEmptyRelatedTags = {
-          ...validTagData,
-          relatedTags: [],
-        };
-        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
-        expect(result.success).toBe(true);
+    describe("RelatedTags Field", () => {});
 
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
     describe("Date Validation", () => {
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
