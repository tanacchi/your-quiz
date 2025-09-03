# Mutant 2facafb0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3843
**Stable ID**: 2facafb0
**Location**: L566:44–L566:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3843
@@ -562,9 +562,9 @@
         ["empty question", { question: "" }, "question"],
         ["invalid answerType", { answerType: "invalid" }, "answerType"],
         ["empty creatorId", { creatorId: "" }, "creatorId"],
         ["empty solutionId", { solutionId: "" }, "solutionId"],
-        ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
+        ["invalid createdAt", { createdAt: "" }, "createdAt"],
       ])(
         "should validate and store errors for %s",
         (_desc, invalidData, errorField) => {
           Object.entries(invalidData).forEach(([key, value]) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
