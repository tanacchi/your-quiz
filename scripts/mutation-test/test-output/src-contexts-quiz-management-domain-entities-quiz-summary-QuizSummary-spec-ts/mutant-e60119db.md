# Mutant e60119db Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3406
**Stable ID**: e60119db
**Location**: L106:11–L106:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3406
@@ -102,9 +102,9 @@
           { creatorId: undefined },
           "Invalid input: expected string, received undefined",
         ],
         [
-          "empty creatorId",
+          "",
           { creatorId: "" },
           "Too small: expected string to have >=1 characters",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
