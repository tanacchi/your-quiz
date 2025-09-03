# Mutant c4637db2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1442
**Stable ID**: c4637db2
**Location**: L711:25–L711:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1442
@@ -707,9 +707,9 @@
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-empty-patches",
             question: "Valid question?",
-            answerType: "boolean",
+            answerType: "",
             solution: { id: "sol-empty", value: true },
             status: "pending_approval",
             creatorId: "creator-empty",
             createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
