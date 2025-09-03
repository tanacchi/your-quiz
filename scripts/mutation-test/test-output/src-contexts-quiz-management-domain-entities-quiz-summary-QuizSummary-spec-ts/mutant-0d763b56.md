# Mutant 0d763b56 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3732
**Stable ID**: 0d763b56
**Location**: L461:26–L461:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3732
@@ -457,9 +457,9 @@
 
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
         it.each([
-          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
+          ["empty list", ["Stryker was here"], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
           ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
         ])(
           "should add multiple tags to quiz with %s",
           (_desc, initialTagIds, newTagIds) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
