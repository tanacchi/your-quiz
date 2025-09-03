# Mutant a1cc95cd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3668
**Stable ID**: a1cc95cd
**Location**: L385:16–L385:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3668
@@ -381,9 +381,9 @@
   });
 
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
-      describe("addTag success scenarios", () => {
+      describe("", () => {
         it.each([
           ["empty tag list", []],
           ["existing tags", [TagId.parse("tag-other")]],
         ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
