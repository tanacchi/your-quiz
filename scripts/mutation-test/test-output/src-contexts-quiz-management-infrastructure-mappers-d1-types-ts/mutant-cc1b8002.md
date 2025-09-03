# Mutant cc1b8002 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: LogicalOperator
**Original ID**: 7841
**Stable ID**: cc1b8002
**Location**: L86:11–L86:78

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7841
@@ -82,9 +82,11 @@
       creator_id: data.creator_id,
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
-      ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
+      ...(data.boolean_value != null || {
+  boolean_value: data.boolean_value
+}),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
       }),
       ...(data.matching_strategy != null && {
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
