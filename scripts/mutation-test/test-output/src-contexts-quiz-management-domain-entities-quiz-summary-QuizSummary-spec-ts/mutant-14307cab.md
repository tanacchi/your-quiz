# Mutant 14307cab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3831
**Stable ID**: 14307cab
**Location**: L564:10–L564:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3831
@@ -560,9 +560,9 @@
     describe("Validation error handling", () => {
       it.each([
         ["empty question", { question: "" }, "question"],
         ["invalid answerType", { answerType: "invalid" }, "answerType"],
-        ["empty creatorId", { creatorId: "" }, "creatorId"],
+        ["", { creatorId: "" }, "creatorId"],
         ["empty solutionId", { solutionId: "" }, "solutionId"],
         ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
       ])(
         "should validate and store errors for %s",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
