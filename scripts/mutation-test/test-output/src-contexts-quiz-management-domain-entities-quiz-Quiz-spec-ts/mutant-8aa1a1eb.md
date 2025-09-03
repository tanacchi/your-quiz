# Mutant 8aa1a1eb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1547
**Stable ID**: 8aa1a1eb
**Location**: L833:11–L833:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1547
@@ -829,9 +829,9 @@
         );
         expect(answerTypePatch).toBeDefined();
         if (
           answerTypePatch &&
-          typeof answerTypePatch === "object" &&
+          true &&
           "answerType" in answerTypePatch
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
