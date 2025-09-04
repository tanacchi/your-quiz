# Mutant d09df649 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 71
**Stable ID**: d09df649
**Location**: L87:11–L87:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #71
@@ -83,9 +83,9 @@
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
-      ...(data.correct_answer != null && {
+      ...(true && {
         correct_answer: data.correct_answer,
       }),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。