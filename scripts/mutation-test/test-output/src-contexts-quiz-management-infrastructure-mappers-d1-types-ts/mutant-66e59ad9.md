# Mutant 66e59ad9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: EqualityOperator
**Original ID**: 7837
**Stable ID**: 66e59ad9
**Location**: L85:11–L85:35

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7837
@@ -81,9 +81,9 @@
       status: data.status,
       creator_id: data.creator_id,
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
-      ...(data.approved_at != null && { approved_at: data.approved_at }),
+      ...(data.approved_at == null && { approved_at: data.approved_at }),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
       }),
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
