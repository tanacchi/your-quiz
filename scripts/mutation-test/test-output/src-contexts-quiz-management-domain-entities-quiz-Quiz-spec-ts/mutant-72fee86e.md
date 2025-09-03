# Mutant 72fee86e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1089
**Stable ID**: 72fee86e
**Location**: L241:10–L241:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1089
@@ -237,9 +237,9 @@
       });
     });
 
     describe("Validation Methods", () => {
-      it("should identify incomplete quiz", () => {
+      it("", () => {
         const incompleteResult = Quiz.from({
           ...validQuizData,
           question: "",
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
