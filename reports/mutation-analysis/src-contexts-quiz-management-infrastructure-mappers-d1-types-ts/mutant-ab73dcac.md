# Mutant ab73dcac Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: EqualityOperator
**Original ID**: 117
**Stable ID**: ab73dcac
**Location**: L82:11–L82:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #117
@@ -78,9 +78,9 @@
       }),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
-      ...(data.case_sensitive != null && {
+      ...(data.case_sensitive == null && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。