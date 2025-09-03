# Mutant e3e611fb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3836
**Stable ID**: e3e611fb
**Location**: L565:10–L565:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3836
@@ -561,9 +561,9 @@
       it.each([
         ["empty question", { question: "" }, "question"],
         ["invalid answerType", { answerType: "invalid" }, "answerType"],
         ["empty creatorId", { creatorId: "" }, "creatorId"],
-        ["empty solutionId", { solutionId: "" }, "solutionId"],
+        ["", { solutionId: "" }, "solutionId"],
         ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
       ])(
         "should validate and store errors for %s",
         (_desc, invalidData, errorField) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
