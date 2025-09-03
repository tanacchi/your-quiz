# Mutant bbed8591 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7365
**Stable ID**: bbed8591
**Location**: L594:11–L594:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7365
@@ -590,9 +590,9 @@
 
       const result = TagSchema.safeParse(minimalTag);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (true) {
         expect(result.data.relatedTags).toEqual([]);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
