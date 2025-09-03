# Mutant 23fb60e1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3413
**Stable ID**: 23fb60e1
**Location**: L113:11–L113:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3413
@@ -109,9 +109,9 @@
         ],
         [
           "missing solutionId",
           { solutionId: undefined },
-          "Invalid input: expected string, received undefined",
+          "",
         ],
         [
           "empty solutionId",
           { solutionId: "" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
