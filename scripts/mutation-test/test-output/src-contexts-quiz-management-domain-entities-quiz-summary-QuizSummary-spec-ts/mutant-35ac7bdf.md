# Mutant 35ac7bdf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3418
**Stable ID**: 35ac7bdf
**Location**: L118:11–L118:62

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3418
@@ -114,9 +114,9 @@
         ],
         [
           "empty solutionId",
           { solutionId: "" },
-          "Too small: expected string to have >=1 characters",
+          "",
         ],
         [
           "invalid createdAt format",
           { createdAt: "invalid-date" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
