# Mutant 8fe5e58c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3386
**Stable ID**: 8fe5e58c
**Location**: L83:11–L83:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3386
@@ -79,9 +79,9 @@
       it.each([
         [
           "invalid answer type",
           { answerType: "invalid_type" },
-          "Invalid option: expected one of ",
+          "",
         ],
         [
           "empty question",
           { question: "" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
