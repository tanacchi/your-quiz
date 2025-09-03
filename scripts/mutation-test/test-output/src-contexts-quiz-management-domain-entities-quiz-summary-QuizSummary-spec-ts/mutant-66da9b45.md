# Mutant 66da9b45 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3281
**Stable ID**: 66da9b45
**Location**: L23:14–L23:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3281
@@ -19,9 +19,9 @@
 
   beforeEach(() => {});
 
   describe("Brand Types", () => {
-    describe("QuizId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["valid with underscore", "quiz_test", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
