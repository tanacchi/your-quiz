# Mutant e7f4e296 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3733
**Stable ID**: e7f4e296
**Location**: L461:30–L461:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3733
@@ -457,9 +457,9 @@
 
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
         it.each([
-          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
+          ["empty list", [], []],
           ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
         ])(
           "should add multiple tags to quiz with %s",
           (_desc, initialTagIds, newTagIds) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
