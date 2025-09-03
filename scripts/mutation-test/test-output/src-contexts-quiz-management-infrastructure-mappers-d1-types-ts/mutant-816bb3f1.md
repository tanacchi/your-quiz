# Mutant 816bb3f1 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: LogicalOperator
**Original ID**: 7847
**Stable ID**: 816bb3f1
**Location**: L87:11–L89:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7847
@@ -83,11 +83,11 @@
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
-      ...(data.correct_answer != null && {
-        correct_answer: data.correct_answer,
-      }),
+      ...(data.correct_answer != null || {
+  correct_answer: data.correct_answer
+}),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
       ...(data.case_sensitive != null && {
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
