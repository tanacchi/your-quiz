# Mutant 75d01f71 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 7830
**Stable ID**: 75d01f71
**Location**: L84:11–L84:35

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7830
@@ -80,9 +80,9 @@
       solution_id: data.solution_id,
       status: data.status,
       creator_id: data.creator_id,
       created_at: data.created_at,
-      ...(data.explanation != null && { explanation: data.explanation }),
+      ...(true && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
