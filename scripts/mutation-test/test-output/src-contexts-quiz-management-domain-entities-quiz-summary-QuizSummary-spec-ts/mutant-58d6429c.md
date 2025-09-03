# Mutant 58d6429c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3867
**Stable ID**: 58d6429c
**Location**: L603:10–L603:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3867
@@ -599,9 +599,9 @@
         expect(quiz.get("question")).toBe("What is TypeScript?");
       });
 
       it.each([
-        ["empty question", { question: "" }],
+        ["", { question: "" }],
         ["invalid answerType", { answerType: "invalid" }],
         ["missing creatorId", { creatorId: undefined }],
         ["missing solutionId", { solutionId: undefined }],
       ])("should fail to commit with %s", (_desc, invalidData) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
