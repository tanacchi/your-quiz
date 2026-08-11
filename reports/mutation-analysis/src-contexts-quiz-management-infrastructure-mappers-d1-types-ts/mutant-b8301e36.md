# Mutant b8301e36 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 94
**Stable ID**: b8301e36
**Location**: L74:39–L74:72

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #94
@@ -70,9 +70,9 @@
       status: data.status,
       creator_id: data.creator_id,
       created_at: data.created_at,
       ...(data.explanation != null && { explanation: data.explanation }),
-      ...(data.approved_at != null && { approved_at: data.approved_at }),
+      ...(data.approved_at != null && {}),
       ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
       ...(data.correct_answer != null && {
         correct_answer: data.correct_answer,
       }),
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。