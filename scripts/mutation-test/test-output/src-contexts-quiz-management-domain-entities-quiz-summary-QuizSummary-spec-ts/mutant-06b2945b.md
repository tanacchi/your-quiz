# Mutant 06b2945b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3797
**Stable ID**: 06b2945b
**Location**: L536:24–L536:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3797
@@ -532,9 +532,9 @@
 
     describe("Field operations", () => {
       it.each([
         ["question", "Draft question"],
-        ["answerType", "single_choice"],
+        ["answerType", ""],
         ["explanation", "Draft explanation"],
         ["creatorId", "draft-creator"],
         ["solutionId", "draft-solution"],
       ])("should set and get %s field", (field, value) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
