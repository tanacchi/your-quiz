# Mutant 40a15e67 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7349
**Stable ID**: 40a15e67
**Location**: L572:11–L572:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7349
@@ -568,9 +568,9 @@
 
       const result = TagSchema.safeParse(hierarchicalTag);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (false) {
         expect(result.data.relatedTags).toHaveLength(4);
         expect(result.data.relatedTags.map((rt) => rt.relationType)).toEqual([
           "hierarchy",
           "category",
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
