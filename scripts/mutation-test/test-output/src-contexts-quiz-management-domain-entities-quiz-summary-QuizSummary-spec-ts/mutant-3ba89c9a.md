# Mutant 3ba89c9a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3415
**Stable ID**: 3ba89c9a
**Location**: L116:11–L116:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3415
@@ -112,9 +112,9 @@
           { solutionId: undefined },
           "Invalid input: expected string, received undefined",
         ],
         [
-          "empty solutionId",
+          "",
           { solutionId: "" },
           "Too small: expected string to have >=1 characters",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
