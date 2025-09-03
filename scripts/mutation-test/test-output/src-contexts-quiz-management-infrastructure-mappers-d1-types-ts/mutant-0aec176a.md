# Mutant 0aec176a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 7844
**Stable ID**: 0aec176a
**Location**: L86:41–L86:78

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7844
@@ -82,9 +82,9 @@
       creator_id: data.creator_id,
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
-      ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
+      ...(data.boolean_value != null && {}),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
       }),
       ...(data.matching_strategy != null && {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
