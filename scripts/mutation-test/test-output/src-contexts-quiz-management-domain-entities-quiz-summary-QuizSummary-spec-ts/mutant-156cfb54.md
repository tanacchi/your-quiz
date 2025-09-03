# Mutant 156cfb54 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3709
**Stable ID**: 156cfb54
**Location**: L430:72–L430:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3709
@@ -426,9 +426,9 @@
         ])(
           "should remove %s from quiz",
           (_desc, tagIndex, expectedRemainingCount) => {
             const initialResult = QuizSummary.from(validQuizData);
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+            const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
             const tagToRemove = validTagIds[tagIndex] as TagId;
 
             const result = quiz.removeTag(tagToRemove);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
