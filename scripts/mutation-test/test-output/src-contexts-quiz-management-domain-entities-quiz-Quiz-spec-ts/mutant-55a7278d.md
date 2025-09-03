# Mutant 55a7278d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 958
**Stable ID**: 55a7278d
**Location**: L67:19–L67:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #958
@@ -63,9 +63,9 @@
 
     it("should suggest patches for invalid data", () => {
       const invalidData = {
         ...validQuizData,
-        question: "  ", // 空白のみ
+        question: "", // 空白のみ
         answerType: "bool", // typo
         status: "pending", // typo
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
