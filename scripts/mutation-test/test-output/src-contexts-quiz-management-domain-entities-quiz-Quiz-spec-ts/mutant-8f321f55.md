# Mutant 8f321f55 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 899
**Stable ID**: 8f321f55
**Location**: L24:10–L24:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #899
@@ -20,9 +20,9 @@
 
   describe("Brand Types", () => {
     describe("QuizId validation", () => {
       it.each([
-        ["valid alphanumeric", "quiz-1", true],
+        ["", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
