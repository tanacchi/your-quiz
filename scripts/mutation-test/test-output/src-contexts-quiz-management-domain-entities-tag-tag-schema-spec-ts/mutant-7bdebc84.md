# Mutant 7bdebc84 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7013
**Stable ID**: 7bdebc84
**Location**: L159:13–L159:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7013
@@ -155,9 +155,9 @@
           validTagData;
         const result = TagSchema.safeParse(dataWithoutRelatedTags);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.relatedTags).toEqual([]);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
