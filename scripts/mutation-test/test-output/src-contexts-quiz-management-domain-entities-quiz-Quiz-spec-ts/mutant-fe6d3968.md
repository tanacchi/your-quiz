# Mutant fe6d3968 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1470
**Stable ID**: fe6d3968
**Location**: L754:25–L754:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1470
@@ -750,9 +750,9 @@
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-object-patch",
             question: "Object patch test?",
-            answerType: "boolean",
+            answerType: "",
             solution: { id: "sol-obj", value: true },
             status: "pending_approval",
             creatorId: "creator-obj",
             createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
