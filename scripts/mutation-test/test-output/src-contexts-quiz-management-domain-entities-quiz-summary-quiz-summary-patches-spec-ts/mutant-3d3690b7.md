# Mutant 3d3690b7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4049
**Stable ID**: 3d3690b7
**Location**: L25:17–L25:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4049
@@ -21,9 +21,9 @@
   const validQuizSummaryInput: QuizSummaryInput = {
     id: "quiz-123",
     question: "What is TypeScript?",
     answerType: "single_choice",
-    solutionId: "solution-456",
+    solutionId: "",
     explanation: "TypeScript is a superset of JavaScript",
     tagIds: ["tag-1", "tag-2"],
     status: "pending_approval",
     creatorId: "creator-789",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
