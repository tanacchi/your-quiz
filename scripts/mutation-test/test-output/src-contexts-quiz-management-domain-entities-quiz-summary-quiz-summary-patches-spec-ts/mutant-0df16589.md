# Mutant 0df16589 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 4573
**Stable ID**: 0df16589
**Location**: L453:13–L454:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4573
@@ -449,10 +449,9 @@
             patch.question === "Sample question",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
+            typeof patch === "object" || "answerType" in patch &&
             patch.answerType === "boolean",
         );
 
         expect(hasIdPatch).toBe(true);
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
