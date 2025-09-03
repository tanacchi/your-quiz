# Mutant 5f76d97c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 4571
**Stable ID**: 5f76d97c
**Location**: L453:13–L455:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4571
@@ -449,11 +449,9 @@
             patch.question === "Sample question",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
+            typeof patch === "object" && "answerType" in patch || patch.answerType === "boolean",
         );
 
         expect(hasIdPatch).toBe(true);
         expect(hasQuestionPatch).toBe(true);
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
