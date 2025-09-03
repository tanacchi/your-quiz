# Mutant d76d33c7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7135
**Stable ID**: d76d33c7
**Location**: L268:58–L476:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7135
@@ -264,218 +264,10 @@
       });
     });
   });
 
-  describe("Cross-Field Validation (superRefine)", () => {
-    describe("Duplicate Related Tag IDs", () => {
-      it("should accept unique related tag IDs", () => {
-        const dataWithUniqueRelatedTagIds = {
-          ...validTagData,
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-1",
-              name: "Category 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-2",
-              name: "Synonym 1",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-3",
-              name: "Related 1",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithUniqueRelatedTagIds);
-        expect(result.success).toBe(true);
-      });
+  describe("Cross-Field Validation (superRefine)", () => {});
 
-      it("should reject duplicate related tag IDs", () => {
-        const dataWithDuplicateRelatedTagIds = {
-          ...validTagData,
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-duplicate",
-              name: "Category 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-duplicate", // duplicate ID
-              name: "Synonym 1",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithDuplicateRelatedTagIds);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const duplicateError = error.issues.find((issue) =>
-            issue.path.includes("relatedTags"),
-          );
-          expect(duplicateError).toBeDefined();
-          expect(duplicateError?.message).toBe(
-            "Duplicate related tag IDs are not allowed",
-          );
-        }
-      });
-
-      it("should handle multiple duplicates", () => {
-        const dataWithMultipleDuplicates = {
-          ...validTagData,
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-1",
-              name: "Category 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-1", // duplicate
-              name: "Synonym 1",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-1", // another duplicate
-              name: "Related 1",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithMultipleDuplicates);
-        expect(result.success).toBe(false);
-      });
-    });
-
-    describe("Self-Reference Prevention", () => {
-      it("should accept tag with no self-reference", () => {
-        const dataWithoutSelfReference = {
-          ...validTagData,
-          id: "tag-main",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-other",
-              name: "Other Tag",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithoutSelfReference);
-        expect(result.success).toBe(true);
-      });
-
-      it("should reject tag that references itself", () => {
-        const dataWithSelfReference = {
-          ...validTagData,
-          id: "tag-self",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-self", // self-reference
-              name: "Self Tag",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithSelfReference);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const selfRefError = error.issues.find((issue) =>
-            issue.path.includes("relatedTags"),
-          );
-          expect(selfRefError).toBeDefined();
-          expect(selfRefError?.message).toBe(
-            "Tag cannot reference itself in related tags",
-          );
-        }
-      });
-
-      it("should reject multiple self-references", () => {
-        const dataWithMultipleSelfReferences = {
-          ...validTagData,
-          id: "tag-self",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-self", // self-reference
-              name: "Self Tag 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-other",
-              name: "Other Tag",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-self", // another self-reference
-              name: "Self Tag 2",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithMultipleSelfReferences);
-        expect(result.success).toBe(false);
-      });
-
-      it("should handle empty related tags without error", () => {
-        const dataWithEmptyRelatedTags = {
-          ...validTagData,
-          id: "tag-lonely",
-          relatedTags: [],
-        };
-        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
-        expect(result.success).toBe(true);
-      });
-    });
-
-    describe("Combined Validation Errors", () => {
-      it("should report both duplicate IDs and self-reference errors", () => {
-        const dataWithBothErrors = {
-          ...validTagData,
-          id: "tag-problem",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-problem", // self-reference
-              name: "Problem Tag 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-dup",
-              name: "Duplicate Tag 1",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-dup", // duplicate
-              name: "Duplicate Tag 2",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithBothErrors);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const relatedTagsErrors = error.issues.filter((issue) =>
-            issue.path.includes("relatedTags"),
-          );
-          expect(relatedTagsErrors).toHaveLength(2); // Both errors should be present
-
-          const errorMessages = relatedTagsErrors.map((err) => err.message);
-          expect(errorMessages).toContain(
-            "Duplicate related tag IDs are not allowed",
-          );
-          expect(errorMessages).toContain(
-            "Tag cannot reference itself in related tags",
-          );
-        }
-      });
-    });
-  });
-
   describe("Edge Cases and Boundary Values", () => {
     describe("Name Length Boundaries", () => {
       it("should accept exactly 1 character name", () => {
         const data = { ...validTagData, name: "A" };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
