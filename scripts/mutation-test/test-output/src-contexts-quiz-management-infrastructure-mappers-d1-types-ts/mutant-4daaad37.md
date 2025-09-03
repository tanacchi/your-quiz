# Mutant 4daaad37 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 7850
**Stable ID**: 4daaad37
**Location**: L87:42–L89:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7850
@@ -83,11 +83,9 @@
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
       ...(data.approved_at != null && { approved_at: data.approved_at }),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
-      ...(data.correct_answer != null && {
-        correct_answer: data.correct_answer,
-      }),
+      ...(data.correct_answer != null && {}),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
       ...(data.case_sensitive != null && {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
