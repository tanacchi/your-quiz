# Mutant 85425eb2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3779
**Stable ID**: 85425eb2
**Location**: L510:54–L510:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3779
@@ -506,9 +506,9 @@
         ])(
           "should remove %s from quiz",
           (_desc, tagsToRemove, expectedRemaining) => {
             const initialResult = QuizSummary.from(validQuizData);
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+            const quiz = initialResult._unsafeUnwrap({});
 
             const result = quiz.removeTags(tagsToRemove as TagId[]);
 
             const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
