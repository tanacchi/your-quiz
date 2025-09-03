# Mutant 3aa637a8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1522
**Stable ID**: 3aa637a8
**Location**: L815:8–L815:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1522
@@ -811,9 +811,9 @@
         expect(questionPatch).toBeDefined();
       }
     });
 
-    it("should suggest answer type fixes", () => {
+    it("", () => {
       const result = Quiz.from({
         ...validQuizData,
         answerType: "bool",
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
