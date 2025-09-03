# Mutant 5c27c7cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3561
**Stable ID**: 5c27c7cb
**Location**: L291:66–L291:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3561
@@ -287,9 +287,9 @@
 
   describe("Fluent API", () => {
     it("should chain setter methods", () => {
       const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+      const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
 
       const result = quiz
         .update("question", "New question")
         .andThen((q) => q.update("explanation", "New explanation"))
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
