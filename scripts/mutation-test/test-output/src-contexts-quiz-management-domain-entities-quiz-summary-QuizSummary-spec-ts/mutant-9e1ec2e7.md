# Mutant 9e1ec2e7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3875
**Stable ID**: 9e1ec2e7
**Location**: L605:10–L605:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3875
@@ -601,9 +601,9 @@
 
       it.each([
         ["empty question", { question: "" }],
         ["invalid answerType", { answerType: "invalid" }],
-        ["missing creatorId", { creatorId: undefined }],
+        ["", { creatorId: undefined }],
         ["missing solutionId", { solutionId: undefined }],
       ])("should fail to commit with %s", (_desc, invalidData) => {
         draft.with({
           ...(validQuizData as Record<string, unknown>),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
