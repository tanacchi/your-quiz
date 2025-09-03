# Mutant 032e2aab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3794
**Stable ID**: 032e2aab
**Location**: L535:22–L535:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3794
@@ -531,9 +531,9 @@
     });
 
     describe("Field operations", () => {
       it.each([
-        ["question", "Draft question"],
+        ["question", ""],
         ["answerType", "single_choice"],
         ["explanation", "Draft explanation"],
         ["creatorId", "draft-creator"],
         ["solutionId", "draft-solution"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
