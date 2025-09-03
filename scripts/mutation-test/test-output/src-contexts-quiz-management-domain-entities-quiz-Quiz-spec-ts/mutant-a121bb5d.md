# Mutant a121bb5d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 1548
**Stable ID**: a121bb5d
**Location**: L833:11–L833:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1548
@@ -829,9 +829,9 @@
         );
         expect(answerTypePatch).toBeDefined();
         if (
           answerTypePatch &&
-          typeof answerTypePatch === "object" &&
+          typeof answerTypePatch !== "object" &&
           "answerType" in answerTypePatch
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
