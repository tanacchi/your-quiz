# Mutant 1e0d8edf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3775
**Stable ID**: 1e0d8edf
**Location**: L505:33–L505:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3775
@@ -501,9 +501,9 @@
             "partial tags",
             [TagId.parse(validTagIds[0])],
             [TagId.parse(validTagIds[1])],
           ],
-          ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
+          ["non-existing tags", [], validTagIds],
         ])(
           "should remove %s from quiz",
           (_desc, tagsToRemove, expectedRemaining) => {
             const initialResult = QuizSummary.from(validQuizData);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
