# Mutant bce1f9e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 893
**Stable ID**: bce1f9e6
**Location**: L21:12–L21:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #893
@@ -17,9 +17,9 @@
     createdAt: "2023-12-01 10:00:00",
     approvedAt: undefined,
   } as const;
 
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
