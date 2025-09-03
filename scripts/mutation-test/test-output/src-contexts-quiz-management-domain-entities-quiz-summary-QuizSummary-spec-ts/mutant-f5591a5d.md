# Mutant f5591a5d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3821
**Stable ID**: f5591a5d
**Location**: L562:10–L562:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3821
@@ -558,9 +558,9 @@
     });
 
     describe("Validation error handling", () => {
       it.each([
-        ["empty question", { question: "" }, "question"],
+        ["", { question: "" }, "question"],
         ["invalid answerType", { answerType: "invalid" }, "answerType"],
         ["empty creatorId", { creatorId: "" }, "creatorId"],
         ["empty solutionId", { solutionId: "" }, "solutionId"],
         ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
