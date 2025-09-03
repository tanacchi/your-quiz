# Mutant d96dd72f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3776
**Stable ID**: d96dd72f
**Location**: L505:46–L505:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3776
@@ -501,9 +501,9 @@
             "partial tags",
             [TagId.parse(validTagIds[0])],
             [TagId.parse(validTagIds[1])],
           ],
-          ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
+          ["non-existing tags", [TagId.parse("")], validTagIds],
         ])(
           "should remove %s from quiz",
           (_desc, tagsToRemove, expectedRemaining) => {
             const initialResult = QuizSummary.from(validQuizData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
