# Mutant 747fdf65 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3780
**Stable ID**: 747fdf65
**Location**: L510:72–L510:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3780
@@ -506,9 +506,9 @@
         ])(
           "should remove %s from quiz",
           (_desc, tagsToRemove, expectedRemaining) => {
             const initialResult = QuizSummary.from(validQuizData);
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+            const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
 
             const result = quiz.removeTags(tagsToRemove as TagId[]);
 
             const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
