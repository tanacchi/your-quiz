# Mutant 1cf326c7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 83
**Stable ID**: 1cf326c7
**Location**: L93:11–L93:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #83
@@ -89,9 +89,9 @@
       }),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
-      ...(data.case_sensitive != null && {
+      ...(true && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。