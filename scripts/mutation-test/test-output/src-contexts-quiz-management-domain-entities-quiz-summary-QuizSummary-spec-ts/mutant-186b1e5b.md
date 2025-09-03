# Mutant 186b1e5b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3777
**Stable ID**: 186b1e5b
**Location**: L507:11–L507:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3777
@@ -503,9 +503,9 @@
             [TagId.parse(validTagIds[1])],
           ],
           ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
         ])(
-          "should remove %s from quiz",
+          "",
           (_desc, tagsToRemove, expectedRemaining) => {
             const initialResult = QuizSummary.from(validQuizData);
             const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
