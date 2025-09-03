# Mutant c0e3ca77 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3411
**Stable ID**: c0e3ca77
**Location**: L111:11–L111:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3411
@@ -107,9 +107,9 @@
           { creatorId: "" },
           "Too small: expected string to have >=1 characters",
         ],
         [
-          "missing solutionId",
+          "",
           { solutionId: undefined },
           "Invalid input: expected string, received undefined",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
