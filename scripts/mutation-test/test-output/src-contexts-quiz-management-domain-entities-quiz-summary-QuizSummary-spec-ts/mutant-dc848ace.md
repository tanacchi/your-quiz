# Mutant dc848ace Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3703
**Stable ID**: dc848ace
**Location**: L424:12–L424:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3703
@@ -420,9 +420,9 @@
       });
 
       describe("removeTag scenarios", () => {
         it.each([
-          ["first tag", 0, 1],
+          ["", 0, 1],
           ["second tag", 1, 1],
         ])(
           "should remove %s from quiz",
           (_desc, tagIndex, expectedRemainingCount) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
