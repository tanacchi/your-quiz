# Mutant 1239f4d4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7214
**Stable ID**: 1239f4d4
**Location**: L396:58–L420:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7214
@@ -392,33 +392,9 @@
           );
         }
       });
 
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
+      it("should reject multiple self-references", () => {});
 
       it("should handle empty related tags without error", () => {
         const dataWithEmptyRelatedTags = {
           ...validTagData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
