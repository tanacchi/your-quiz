# Mutant 4ef5b0cf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3393
**Stable ID**: 4ef5b0cf
**Location**: L91:11–L91:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3393
@@ -87,9 +87,9 @@
           { question: "" },
           "Too small: expected string to have >=1 characters",
         ],
         [
-          "missing question",
+          "",
           { question: undefined },
           "Invalid input: expected string, received undefined",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
