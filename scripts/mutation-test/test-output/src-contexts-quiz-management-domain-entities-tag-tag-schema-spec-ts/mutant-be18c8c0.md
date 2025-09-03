# Mutant be18c8c0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7153
**Stable ID**: be18c8c0
**Location**: L295:59–L324:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7153
@@ -291,39 +291,10 @@
         const result = TagSchema.safeParse(dataWithUniqueRelatedTagIds);
         expect(result.success).toBe(true);
       });
 
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
+      it("should reject duplicate related tag IDs", () => {});
 
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
       it("should handle multiple duplicates", () => {
         const dataWithMultipleDuplicates = {
           ...validTagData,
           relatedTags: [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
