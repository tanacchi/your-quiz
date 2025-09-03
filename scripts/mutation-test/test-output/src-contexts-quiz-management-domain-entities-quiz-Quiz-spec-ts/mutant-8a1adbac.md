# Mutant 8a1adbac Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1500
**Stable ID**: 8a1adbac
**Location**: L797:12–L797:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1500
@@ -793,9 +793,9 @@
       });
     });
   });
 
-  describe("Patch System", () => {
+  describe("", () => {
     it("should suggest question fixes", () => {
       const result = Quiz.from({
         ...validQuizData,
         question: "   ",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
