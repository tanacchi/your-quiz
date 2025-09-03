# Mutant 645fa8bf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3473
**Stable ID**: 645fa8bf
**Location**: L176:10–L176:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3473
@@ -172,9 +172,9 @@
     describe("Default value handling", () => {
       it.each([
         ["undefined tagIds", { tagIds: undefined }, []],
         ["null tagIds", { tagIds: null }, []],
-        ["missing tagIds", {}, validQuizData.tagIds],
+        ["", {}, validQuizData.tagIds],
       ])(
         "should handle %s and default to empty array",
         (_desc, modification, expectedTagIds) => {
           const testData = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
