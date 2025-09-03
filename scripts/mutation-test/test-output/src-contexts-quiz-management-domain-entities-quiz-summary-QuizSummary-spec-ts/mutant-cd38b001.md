# Mutant cd38b001 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3556
**Stable ID**: cd38b001
**Location**: L288:12–L288:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3556
@@ -284,9 +284,9 @@
       expect(error).toBeDefined();
     });
   });
 
-  describe("Fluent API", () => {
+  describe("", () => {
     it("should chain setter methods", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
