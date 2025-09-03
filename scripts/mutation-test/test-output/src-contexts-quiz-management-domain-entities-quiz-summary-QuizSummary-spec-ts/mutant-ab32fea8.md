# Mutant ab32fea8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3537
**Stable ID**: ab32fea8
**Location**: L263:48–L263:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3537
@@ -259,9 +259,9 @@
     });
 
     it("should update with mutator function", () => {
       const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+      const quiz = initialResult._unsafeUnwrap({});
 
       const result = quiz.withMutator((draft) => {
         draft.question = "Mutator updated question";
         draft.explanation = "Mutator updated explanation";
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
