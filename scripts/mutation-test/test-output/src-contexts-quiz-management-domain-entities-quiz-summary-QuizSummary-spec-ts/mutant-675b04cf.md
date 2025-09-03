# Mutant 675b04cf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3676
**Stable ID**: 675b04cf
**Location**: L388:29–L388:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3676
@@ -384,9 +384,9 @@
     describe("Single tag operations", () => {
       describe("addTag success scenarios", () => {
         it.each([
           ["empty tag list", []],
-          ["existing tags", [TagId.parse("tag-other")]],
+          ["existing tags", []],
         ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
             tagIds: initialTagIds,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
