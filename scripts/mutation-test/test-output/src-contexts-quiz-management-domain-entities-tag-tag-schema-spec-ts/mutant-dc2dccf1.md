# Mutant dc2dccf1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7366
**Stable ID**: dc2dccf1
**Location**: L594:11–L594:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7366
@@ -590,9 +590,9 @@
 
       const result = TagSchema.safeParse(minimalTag);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (false) {
         expect(result.data.relatedTags).toEqual([]);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
