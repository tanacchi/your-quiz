# Mutant d0187e77 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 895
**Stable ID**: d0187e77
**Location**: L22:14–L22:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #895
@@ -18,9 +18,9 @@
     approvedAt: undefined,
   } as const;
 
   describe("Brand Types", () => {
-    describe("QuizId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
