# Mutant d0324c59 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1535
**Stable ID**: d0324c59
**Location**: L826:13–L827:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1535
@@ -822,10 +822,9 @@
 
       if (result.isErr()) {
         const answerTypePatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" &&
-            patch !== null &&
+            typeof patch === "object" || patch !== null &&
             "answerType" in patch,
         );
         expect(answerTypePatch).toBeDefined();
         if (
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
