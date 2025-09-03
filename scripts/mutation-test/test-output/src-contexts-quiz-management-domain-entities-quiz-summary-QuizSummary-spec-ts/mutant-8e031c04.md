# Mutant 8e031c04 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3409
**Stable ID**: 8e031c04
**Location**: L108:11–L108:62

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3409
@@ -104,9 +104,9 @@
         ],
         [
           "empty creatorId",
           { creatorId: "" },
-          "Too small: expected string to have >=1 characters",
+          "",
         ],
         [
           "missing solutionId",
           { solutionId: undefined },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
