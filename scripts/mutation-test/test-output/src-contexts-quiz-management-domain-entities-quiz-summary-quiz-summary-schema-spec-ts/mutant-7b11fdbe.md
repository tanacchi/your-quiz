# Mutant 7b11fdbe Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4926
**Stable ID**: 7b11fdbe
**Location**: L28:14–L28:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4926
@@ -24,9 +24,9 @@
     createdAt: "2023-12-01 10:00:00",
   };
 
   describe("Brand Types", () => {
-    describe("QuizId", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "quiz-123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid single char", "q", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
