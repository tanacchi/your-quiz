# Mutant e5195a98 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3285
**Stable ID**: e5195a98
**Location**: L25:10–L25:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3285
@@ -21,9 +21,9 @@
 
   describe("Brand Types", () => {
     describe("QuizId validation", () => {
       it.each([
-        ["valid alphanumeric", "quiz-1", true],
+        ["", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid with dash", "quiz-test", true],
         ["valid single char", "q", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
