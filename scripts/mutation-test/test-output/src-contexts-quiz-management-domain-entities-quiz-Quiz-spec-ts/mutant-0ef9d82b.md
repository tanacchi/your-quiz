# Mutant 0ef9d82b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1525
**Stable ID**: 0ef9d82b
**Location**: L818:21–L818:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1525
@@ -814,9 +814,9 @@
 
     it("should suggest answer type fixes", () => {
       const result = Quiz.from({
         ...validQuizData,
-        answerType: "bool",
+        answerType: "",
       });
 
       expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
