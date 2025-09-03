# Mutant 3fa9d56c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4048
**Stable ID**: 3fa9d56c
**Location**: L24:17–L24:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4048
@@ -20,9 +20,9 @@
 describe("QuizSummary Patches", () => {
   const validQuizSummaryInput: QuizSummaryInput = {
     id: "quiz-123",
     question: "What is TypeScript?",
-    answerType: "single_choice",
+    answerType: "",
     solutionId: "solution-456",
     explanation: "TypeScript is a superset of JavaScript",
     tagIds: ["tag-1", "tag-2"],
     status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
