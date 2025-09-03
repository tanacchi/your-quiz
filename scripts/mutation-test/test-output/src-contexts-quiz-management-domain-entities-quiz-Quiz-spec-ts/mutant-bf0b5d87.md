# Mutant bf0b5d87 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1310
**Stable ID**: bf0b5d87
**Location**: L525:18–L525:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1310
@@ -521,9 +521,9 @@
           let iterationCount = 0;
           const maxIterations = 5;
 
           // Apply patches iteratively until no more errors or max iterations
-          while (draft.hasErrors() && iterationCount < maxIterations) {
+          while (draft.hasErrors() || iterationCount < maxIterations) {
             const patches = draft.getPatches();
             if (patches.length === 0) break;
 
             draft.applyPatches(patches);
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
