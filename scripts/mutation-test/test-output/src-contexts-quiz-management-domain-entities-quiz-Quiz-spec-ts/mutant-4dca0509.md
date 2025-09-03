# Mutant 4dca0509 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1487
**Stable ID**: 4dca0509
**Location**: L776:25–L776:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1487
@@ -772,9 +772,9 @@
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-patch-error",
             question: "Patch error test?",
-            answerType: "boolean",
+            answerType: "",
             solution: { id: "sol-error", value: true },
             status: "pending_approval",
             creatorId: "creator-error",
             createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
