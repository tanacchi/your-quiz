# Mutant 50bb2faf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3560
**Stable ID**: 50bb2faf
**Location**: L291:48–L291:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3560
@@ -287,9 +287,9 @@
 
   describe("Fluent API", () => {
     it("should chain setter methods", () => {
       const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+      const quiz = initialResult._unsafeUnwrap({});
 
       const result = quiz
         .update("question", "New question")
         .andThen((q) => q.update("explanation", "New explanation"))
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
