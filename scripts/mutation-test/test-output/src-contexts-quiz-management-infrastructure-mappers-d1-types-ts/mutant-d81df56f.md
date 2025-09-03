# Mutant d81df56f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: EqualityOperator
**Original ID**: 7855
**Stable ID**: d81df56f
**Location**: L90:11–L90:41

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7855
@@ -86,9 +86,9 @@
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
       }),
-      ...(data.matching_strategy != null && {
+      ...(data.matching_strategy == null && {
         matching_strategy: data.matching_strategy,
       }),
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
