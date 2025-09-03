# Mutant 26cb44b1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1505
**Stable ID**: 26cb44b1
**Location**: L801:19–L801:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1505
@@ -797,9 +797,9 @@
   describe("Patch System", () => {
     it("should suggest question fixes", () => {
       const result = Quiz.from({
         ...validQuizData,
-        question: "   ",
+        question: "",
       });
 
       expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
