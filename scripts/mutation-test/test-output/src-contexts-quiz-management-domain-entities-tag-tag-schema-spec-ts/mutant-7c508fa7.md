# Mutant 7c508fa7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7137
**Stable ID**: 7c508fa7
**Location**: L269:49–L350:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7137
@@ -265,91 +265,10 @@
     });
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
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
+    describe("Duplicate Related Tag IDs", () => {});
 
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
     describe("Self-Reference Prevention", () => {
       it("should accept tag with no self-reference", () => {
         const dataWithoutSelfReference = {
           ...validTagData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
