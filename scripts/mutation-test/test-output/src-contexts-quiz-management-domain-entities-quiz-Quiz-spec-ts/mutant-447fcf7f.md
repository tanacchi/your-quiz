# Mutant 447fcf7f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 959
**Stable ID**: 447fcf7f
**Location**: L68:21–L68:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #959
@@ -64,9 +64,9 @@
     it("should suggest patches for invalid data", () => {
       const invalidData = {
         ...validQuizData,
         question: "  ", // 空白のみ
-        answerType: "bool", // typo
+        answerType: "", // typo
         status: "pending", // typo
       };
 
       const result = Quiz.from(invalidData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
