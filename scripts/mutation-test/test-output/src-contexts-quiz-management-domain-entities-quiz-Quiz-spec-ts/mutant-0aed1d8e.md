# Mutant 0aed1d8e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 955
**Stable ID**: 0aed1d8e
**Location**: L64:8–L64:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #955
@@ -60,9 +60,9 @@
         expect(quiz.get("status")).toBe("pending_approval");
       }
     });
 
-    it("should suggest patches for invalid data", () => {
+    it("", () => {
       const invalidData = {
         ...validQuizData,
         question: "  ", // 空白のみ
         answerType: "bool", // typo
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
