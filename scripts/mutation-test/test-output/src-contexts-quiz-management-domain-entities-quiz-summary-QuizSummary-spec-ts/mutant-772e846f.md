# Mutant 772e846f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3673
**Stable ID**: 772e846f
**Location**: L387:30–L387:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3673
@@ -383,9 +383,9 @@
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
       describe("addTag success scenarios", () => {
         it.each([
-          ["empty tag list", []],
+          ["empty tag list", ["Stryker was here"]],
           ["existing tags", [TagId.parse("tag-other")]],
         ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
