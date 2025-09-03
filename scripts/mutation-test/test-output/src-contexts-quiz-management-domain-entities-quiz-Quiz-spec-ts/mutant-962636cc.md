# Mutant 962636cc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1309
**Stable ID**: 962636cc
**Location**: L525:18–L525:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1309
@@ -521,9 +521,9 @@
           let iterationCount = 0;
           const maxIterations = 5;
 
           // Apply patches iteratively until no more errors or max iterations
-          while (draft.hasErrors() && iterationCount < maxIterations) {
+          while (false) {
             const patches = draft.getPatches();
             if (patches.length === 0) break;
 
             draft.applyPatches(patches);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
