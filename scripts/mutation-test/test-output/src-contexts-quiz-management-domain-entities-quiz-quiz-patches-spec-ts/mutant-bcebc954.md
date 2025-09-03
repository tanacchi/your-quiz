# Mutant bcebc954 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2269
**Stable ID**: bcebc954
**Location**: L550:13–L551:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2269
@@ -546,10 +546,9 @@
             patch.question === "Sample boolean question?",
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
