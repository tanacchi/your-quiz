# Mutant 66fedf84 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3580
**Stable ID**: 66fedf84
**Location**: L306:14–L306:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3580
@@ -302,9 +302,9 @@
     });
   });
 
   describe("Business Logic", () => {
-    describe("canBeUpdated status checks", () => {
+    describe("", () => {
       it.each([
         ["pending_approval", true],
         ["approved", false],
         ["rejected", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
