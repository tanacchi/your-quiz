# Mutant 04b2516e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3745
**Stable ID**: 04b2516e
**Location**: L470:54–L470:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3745
@@ -466,9 +466,9 @@
             const initialResult = QuizSummary.from({
               ...(validQuizData as Record<string, unknown>),
               tagIds: initialTagIds,
             });
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+            const quiz = initialResult._unsafeUnwrap({});
 
             const result = quiz.addTags(newTagIds);
 
             const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
