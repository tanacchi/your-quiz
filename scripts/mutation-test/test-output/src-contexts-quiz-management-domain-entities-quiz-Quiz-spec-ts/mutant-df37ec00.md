# Mutant df37ec00 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1544
**Stable ID**: df37ec00
**Location**: L832:11–L834:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1544
@@ -828,11 +828,9 @@
             "answerType" in patch,
         );
         expect(answerTypePatch).toBeDefined();
         if (
-          answerTypePatch &&
-          typeof answerTypePatch === "object" &&
-          "answerType" in answerTypePatch
+          answerTypePatch && typeof answerTypePatch === "object" || "answerType" in answerTypePatch
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
       }
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
