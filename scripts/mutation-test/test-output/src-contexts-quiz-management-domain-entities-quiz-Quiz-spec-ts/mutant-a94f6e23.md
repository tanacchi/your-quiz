# Mutant a94f6e23 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1549
**Stable ID**: a94f6e23
**Location**: L833:38–L833:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1549
@@ -829,9 +829,9 @@
         );
         expect(answerTypePatch).toBeDefined();
         if (
           answerTypePatch &&
-          typeof answerTypePatch === "object" &&
+          typeof answerTypePatch === "" &&
           "answerType" in answerTypePatch
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
