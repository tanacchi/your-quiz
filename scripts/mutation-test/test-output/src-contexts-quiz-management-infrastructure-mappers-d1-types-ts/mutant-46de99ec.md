# Mutant 46de99ec Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: EqualityOperator
**Original ID**: 7831
**Stable ID**: 46de99ec
**Location**: L84:11–L84:35

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7831
@@ -80,9 +80,9 @@
       solution_id: data.solution_id,
       status: data.status,
       creator_id: data.creator_id,
       created_at: data.created_at,
-      ...(data.explanation != null && { explanation: data.explanation }),
+      ...(data.explanation == null && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
