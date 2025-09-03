# Mutant aa6941b3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1502
**Stable ID**: aa6941b3
**Location**: L798:8–L798:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1502
@@ -794,9 +794,9 @@
     });
   });
 
   describe("Patch System", () => {
-    it("should suggest question fixes", () => {
+    it("", () => {
       const result = Quiz.from({
         ...validQuizData,
         question: "   ",
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
