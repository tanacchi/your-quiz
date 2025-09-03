# Mutant c618173b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3677
**Stable ID**: c618173b
**Location**: L388:42–L388:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3677
@@ -384,9 +384,9 @@
     describe("Single tag operations", () => {
       describe("addTag success scenarios", () => {
         it.each([
           ["empty tag list", []],
-          ["existing tags", [TagId.parse("tag-other")]],
+          ["existing tags", [TagId.parse("")]],
         ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
             tagIds: initialTagIds,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
