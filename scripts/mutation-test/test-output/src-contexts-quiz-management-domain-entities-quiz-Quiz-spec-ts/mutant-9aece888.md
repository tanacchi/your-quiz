# Mutant 9aece888 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 960
**Stable ID**: 9aece888
**Location**: L69:17–L69:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #960
@@ -65,9 +65,9 @@
       const invalidData = {
         ...validQuizData,
         question: "  ", // 空白のみ
         answerType: "bool", // typo
-        status: "pending", // typo
+        status: "", // typo
       };
 
       const result = Quiz.from(invalidData);
       expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
