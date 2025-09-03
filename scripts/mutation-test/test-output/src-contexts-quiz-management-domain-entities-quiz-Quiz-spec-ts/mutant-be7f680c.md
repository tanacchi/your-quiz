# Mutant be7f680c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1488
**Stable ID**: be7f680c
**Location**: L777:23–L777:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1488
@@ -773,9 +773,9 @@
           draft.with({
             id: "quiz-patch-error",
             question: "Patch error test?",
             answerType: "boolean",
-            solution: { id: "sol-error", value: true },
+            solution: {},
             status: "pending_approval",
             creatorId: "creator-error",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
