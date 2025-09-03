# Mutant e3a0cadb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3742
**Stable ID**: e3a0cadb
**Location**: L464:11–L464:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3742
@@ -460,9 +460,9 @@
         it.each([
           ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
           ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
         ])(
-          "should add multiple tags to quiz with %s",
+          "",
           (_desc, initialTagIds, newTagIds) => {
             const initialResult = QuizSummary.from({
               ...(validQuizData as Record<string, unknown>),
               tagIds: initialTagIds,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
