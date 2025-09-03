# Mutant c70e686b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3741
**Stable ID**: c70e686b
**Location**: L462:70–L462:77

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3741
@@ -458,9 +458,9 @@
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
         it.each([
           ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
-          ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
+          ["existing tags", [TagId.parse("tag-other")], [TagId.parse("")]],
         ])(
           "should add multiple tags to quiz with %s",
           (_desc, initialTagIds, newTagIds) => {
             const initialResult = QuizSummary.from({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
