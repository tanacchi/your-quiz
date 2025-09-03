# Mutant bcb8d3da Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 903
**Stable ID**: bcb8d3da
**Location**: L25:10–L25:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #903
@@ -21,9 +21,9 @@
   describe("Brand Types", () => {
     describe("QuizId validation", () => {
       it.each([
         ["valid alphanumeric", "quiz-1", true],
-        ["valid with numbers", "quiz123", true],
+        ["", "quiz123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
