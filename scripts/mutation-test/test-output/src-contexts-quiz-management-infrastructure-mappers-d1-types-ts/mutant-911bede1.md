# Mutant 911bede1 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 7858
**Stable ID**: 911bede1
**Location**: L93:11–L95:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7858
@@ -89,11 +89,9 @@
       }),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
-      ...(data.case_sensitive != null && {
-        case_sensitive: data.case_sensitive,
-      }),
+      ...(false),
       ...(data.choices != null && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
