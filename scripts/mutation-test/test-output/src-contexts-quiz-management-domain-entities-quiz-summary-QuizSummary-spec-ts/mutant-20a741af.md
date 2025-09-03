# Mutant 20a741af Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3383
**Stable ID**: 20a741af
**Location**: L81:11–L81:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3383
@@ -77,9 +77,9 @@
 
     describe("Invalid field values", () => {
       it.each([
         [
-          "invalid answer type",
+          "",
           { answerType: "invalid_type" },
           "Invalid option: expected one of ",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
