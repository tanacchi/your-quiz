# Mutant d6532d95 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3678
**Stable ID**: d6532d95
**Location**: L389:12–L389:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3678
@@ -385,9 +385,9 @@
       describe("addTag success scenarios", () => {
         it.each([
           ["empty tag list", []],
           ["existing tags", [TagId.parse("tag-other")]],
-        ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
+        ])("", (_desc, initialTagIds) => {
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
             tagIds: initialTagIds,
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
