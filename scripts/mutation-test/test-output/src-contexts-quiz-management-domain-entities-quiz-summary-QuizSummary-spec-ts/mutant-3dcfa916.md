# Mutant 3dcfa916 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3578
**Stable ID**: 3dcfa916
**Location**: L305:12–L305:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3578
@@ -301,9 +301,9 @@
       expect(finalQuiz.get("answerType")).toBe("multiple_choice");
     });
   });
 
-  describe("Business Logic", () => {
+  describe("", () => {
     describe("canBeUpdated status checks", () => {
       it.each([
         ["pending_approval", true],
         ["approved", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
