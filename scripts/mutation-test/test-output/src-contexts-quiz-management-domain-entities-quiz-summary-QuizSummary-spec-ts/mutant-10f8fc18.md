# Mutant 10f8fc18 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3672
**Stable ID**: 10f8fc18
**Location**: L387:12–L387:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3672
@@ -383,9 +383,9 @@
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
       describe("addTag success scenarios", () => {
         it.each([
-          ["empty tag list", []],
+          ["", []],
           ["existing tags", [TagId.parse("tag-other")]],
         ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
