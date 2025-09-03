# Mutant 8e188a07 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3706
**Stable ID**: 8e188a07
**Location**: L427:11–L427:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3706
@@ -423,9 +423,9 @@
         it.each([
           ["first tag", 0, 1],
           ["second tag", 1, 1],
         ])(
-          "should remove %s from quiz",
+          "",
           (_desc, tagIndex, expectedRemainingCount) => {
             const initialResult = QuizSummary.from(validQuizData);
             const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
             const tagToRemove = validTagIds[tagIndex] as TagId;
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
