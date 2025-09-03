# Mutant fce9fa5e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3385
**Stable ID**: fce9fa5e
**Location**: L82:25–L82:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3385
@@ -78,9 +78,9 @@
     describe("Invalid field values", () => {
       it.each([
         [
           "invalid answer type",
-          { answerType: "invalid_type" },
+          { answerType: "" },
           "Invalid option: expected one of ",
         ],
         [
           "empty question",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
