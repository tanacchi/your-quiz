# Mutant df05e72a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3670
**Stable ID**: df05e72a
**Location**: L386:17–L389:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3670
@@ -382,12 +382,9 @@
 
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
       describe("addTag success scenarios", () => {
-        it.each([
-          ["empty tag list", []],
-          ["existing tags", [TagId.parse("tag-other")]],
-        ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
+        it.each([])("should add tag to quiz with %s", (_desc, initialTagIds) => {
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
             tagIds: initialTagIds,
           });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
