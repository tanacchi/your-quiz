# Mutant 226c0ea0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1546
**Stable ID**: 226c0ea0
**Location**: L832:11–L833:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1546
@@ -828,10 +828,9 @@
             "answerType" in patch,
         );
         expect(answerTypePatch).toBeDefined();
         if (
-          answerTypePatch &&
-          typeof answerTypePatch === "object" &&
+          answerTypePatch || typeof answerTypePatch === "object" &&
           "answerType" in answerTypePatch
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
