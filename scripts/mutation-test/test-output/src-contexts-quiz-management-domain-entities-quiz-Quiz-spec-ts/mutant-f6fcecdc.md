# Mutant f6fcecdc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1303
**Stable ID**: f6fcecdc
**Location**: L515:23–L515:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1303
@@ -511,9 +511,9 @@
           draft.with({
             id: "quiz-multi-patches",
             question: "  ",
             answerType: "bool" as unknown as "boolean",
-            solution: { id: "sol-multi-null", value: true },
+            solution: {},
             status: "pending_approval",
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
