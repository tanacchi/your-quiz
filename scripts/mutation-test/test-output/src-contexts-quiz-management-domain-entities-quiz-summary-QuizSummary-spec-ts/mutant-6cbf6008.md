# Mutant 6cbf6008 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3289
**Stable ID**: 6cbf6008
**Location**: L26:10–L26:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3289
@@ -22,9 +22,9 @@
   describe("Brand Types", () => {
     describe("QuizId validation", () => {
       it.each([
         ["valid alphanumeric", "quiz-1", true],
-        ["valid with numbers", "quiz123", true],
+        ["", "quiz123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid with dash", "quiz-test", true],
         ["valid single char", "q", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
