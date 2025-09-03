# Mutant 03c17e07 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3705
**Stable ID**: 03c17e07
**Location**: L425:12–L425:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3705
@@ -421,9 +421,9 @@
 
       describe("removeTag scenarios", () => {
         it.each([
           ["first tag", 0, 1],
-          ["second tag", 1, 1],
+          ["", 1, 1],
         ])(
           "should remove %s from quiz",
           (_desc, tagIndex, expectedRemainingCount) => {
             const initialResult = QuizSummary.from(validQuizData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
