# Mutant ddf2f7ec Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 1317
**Stable ID**: ddf2f7ec
**Location**: L527:17–L527:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1317
@@ -523,9 +523,9 @@
 
           // Apply patches iteratively until no more errors or max iterations
           while (draft.hasErrors() && iterationCount < maxIterations) {
             const patches = draft.getPatches();
-            if (patches.length === 0) break;
+            if (patches.length !== 0) break;
 
             draft.applyPatches(patches);
             iterationCount++;
           }
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
