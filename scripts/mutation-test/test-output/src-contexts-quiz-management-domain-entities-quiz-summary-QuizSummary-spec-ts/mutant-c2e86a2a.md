# Mutant c2e86a2a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3746
**Stable ID**: c2e86a2a
**Location**: L470:72–L470:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3746
@@ -466,9 +466,9 @@
             const initialResult = QuizSummary.from({
               ...(validQuizData as Record<string, unknown>),
               tagIds: initialTagIds,
             });
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+            const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
 
             const result = quiz.addTags(newTagIds);
 
             const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
