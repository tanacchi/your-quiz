# Mutant 8d5a7dcb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3873
**Stable ID**: 8d5a7dcb
**Location**: L604:46–L604:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3873
@@ -600,9 +600,9 @@
       });
 
       it.each([
         ["empty question", { question: "" }],
-        ["invalid answerType", { answerType: "invalid" }],
+        ["invalid answerType", { answerType: "" }],
         ["missing creatorId", { creatorId: undefined }],
         ["missing solutionId", { solutionId: undefined }],
       ])("should fail to commit with %s", (_desc, invalidData) => {
         draft.with({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
