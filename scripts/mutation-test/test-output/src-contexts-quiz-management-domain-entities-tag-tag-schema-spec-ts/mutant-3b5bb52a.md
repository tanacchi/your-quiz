# Mutant 3b5bb52a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7350
**Stable ID**: 3b5bb52a
**Location**: L572:27–L580:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7350
@@ -568,17 +568,9 @@
 
       const result = TagSchema.safeParse(hierarchicalTag);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.relatedTags).toHaveLength(4);
-        expect(result.data.relatedTags.map((rt) => rt.relationType)).toEqual([
-          "hierarchy",
-          "category",
-          "synonym",
-          "related",
-        ]);
-      }
+      if (result.success) {}
     });
 
     it("should handle minimal tag without related tags", () => {
       const minimalTag = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
