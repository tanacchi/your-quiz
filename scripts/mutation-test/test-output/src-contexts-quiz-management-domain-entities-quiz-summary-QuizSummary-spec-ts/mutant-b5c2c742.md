# Mutant b5c2c742 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3279
**Stable ID**: b5c2c742
**Location**: L22:12–L22:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3279
@@ -18,9 +18,9 @@
   } as const;
 
   beforeEach(() => {});
 
-  describe("Brand Types", () => {
+  describe("", () => {
     describe("QuizId validation", () => {
       it.each([
         ["valid alphanumeric", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
