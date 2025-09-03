# Mutant ad0f2a6f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1365
**Stable ID**: ad0f2a6f
**Location**: L611:25–L611:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1365
@@ -607,9 +607,9 @@
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-equivalent",
             question: "Are fromDraft and commit equivalent?",
-            answerType: "boolean",
+            answerType: "",
             solution: { id: "sol-equivalent", value: true },
             status: "pending_approval",
             creatorId: "creator-equivalent",
             createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
