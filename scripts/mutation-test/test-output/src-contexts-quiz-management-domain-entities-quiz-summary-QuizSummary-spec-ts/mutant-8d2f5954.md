# Mutant 8d2f5954 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3469
**Stable ID**: 8d2f5954
**Location**: L175:10–L175:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3469
@@ -171,9 +171,9 @@
 
     describe("Default value handling", () => {
       it.each([
         ["undefined tagIds", { tagIds: undefined }, []],
-        ["null tagIds", { tagIds: null }, []],
+        ["", { tagIds: null }, []],
         ["missing tagIds", {}, validQuizData.tagIds],
       ])(
         "should handle %s and default to empty array",
         (_desc, modification, expectedTagIds) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
