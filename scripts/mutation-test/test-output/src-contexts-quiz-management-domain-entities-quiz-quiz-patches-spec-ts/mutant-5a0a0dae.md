# Mutant 5a0a0dae Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1644
**Stable ID**: 5a0a0dae
**Location**: L23:15–L23:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1644
@@ -19,9 +19,9 @@
 
 describe("Quiz Patches", () => {
   const validQuizInput: QuizInput = {
     id: "quiz-123",
-    question: "Is TypeScript a superset of JavaScript?",
+    question: "",
     answerType: "boolean",
     solution: {
       id: "solution-456",
       value: true,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
