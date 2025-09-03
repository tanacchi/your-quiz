# Mutant dc4f0429 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3388
**Stable ID**: dc4f0429
**Location**: L86:11–L86:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3388
@@ -82,9 +82,9 @@
           { answerType: "invalid_type" },
           "Invalid option: expected one of ",
         ],
         [
-          "empty question",
+          "",
           { question: "" },
           "Too small: expected string to have >=1 characters",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
