# Mutant 8b9d69a1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3740
**Stable ID**: 8b9d69a1
**Location**: L462:57–L462:79

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3740
@@ -458,9 +458,9 @@
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
         it.each([
           ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
-          ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
+          ["existing tags", [TagId.parse("tag-other")], []],
         ])(
           "should add multiple tags to quiz with %s",
           (_desc, initialTagIds, newTagIds) => {
             const initialResult = QuizSummary.from({
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
