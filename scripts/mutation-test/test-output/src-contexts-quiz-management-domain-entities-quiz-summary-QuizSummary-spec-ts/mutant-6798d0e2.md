# Mutant 6798d0e2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3878
**Stable ID**: 6798d0e2
**Location**: L606:10–L606:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3878
@@ -602,9 +602,9 @@
       it.each([
         ["empty question", { question: "" }],
         ["invalid answerType", { answerType: "invalid" }],
         ["missing creatorId", { creatorId: undefined }],
-        ["missing solutionId", { solutionId: undefined }],
+        ["", { solutionId: undefined }],
       ])("should fail to commit with %s", (_desc, invalidData) => {
         draft.with({
           ...(validQuizData as Record<string, unknown>),
           ...invalidData,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
