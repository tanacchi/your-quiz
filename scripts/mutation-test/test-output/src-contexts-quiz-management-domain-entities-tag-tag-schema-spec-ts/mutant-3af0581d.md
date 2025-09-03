# Mutant 3af0581d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7141
**Stable ID**: 3af0581d
**Location**: L273:24–L289:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7141
@@ -269,25 +269,9 @@
     describe("Duplicate Related Tag IDs", () => {
       it("should accept unique related tag IDs", () => {
         const dataWithUniqueRelatedTagIds = {
           ...validTagData,
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
+          relatedTags: [],
         };
         const result = TagSchema.safeParse(dataWithUniqueRelatedTagIds);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
