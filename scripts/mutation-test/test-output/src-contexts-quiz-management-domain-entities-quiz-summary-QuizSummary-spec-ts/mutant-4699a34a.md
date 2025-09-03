# Mutant 4699a34a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3828
**Stable ID**: 4699a34a
**Location**: L563:46–L563:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3828
@@ -559,9 +559,9 @@
 
     describe("Validation error handling", () => {
       it.each([
         ["empty question", { question: "" }, "question"],
-        ["invalid answerType", { answerType: "invalid" }, "answerType"],
+        ["invalid answerType", { answerType: "" }, "answerType"],
         ["empty creatorId", { creatorId: "" }, "creatorId"],
         ["empty solutionId", { solutionId: "" }, "solutionId"],
         ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
       ])(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
