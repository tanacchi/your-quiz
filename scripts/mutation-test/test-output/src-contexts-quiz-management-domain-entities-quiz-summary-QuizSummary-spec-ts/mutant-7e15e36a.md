# Mutant 7e15e36a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3404
**Stable ID**: 7e15e36a
**Location**: L103:11–L103:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3404
@@ -99,9 +99,9 @@
         ],
         [
           "missing creatorId",
           { creatorId: undefined },
-          "Invalid input: expected string, received undefined",
+          "",
         ],
         [
           "empty creatorId",
           { creatorId: "" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
