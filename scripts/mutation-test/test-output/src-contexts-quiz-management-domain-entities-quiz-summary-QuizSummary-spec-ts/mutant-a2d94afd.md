# Mutant a2d94afd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3735
**Stable ID**: a2d94afd
**Location**: L461:65–L461:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3735
@@ -457,9 +457,9 @@
 
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
         it.each([
-          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
+          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("")]],
           ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
         ])(
           "should add multiple tags to quiz with %s",
           (_desc, initialTagIds, newTagIds) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
