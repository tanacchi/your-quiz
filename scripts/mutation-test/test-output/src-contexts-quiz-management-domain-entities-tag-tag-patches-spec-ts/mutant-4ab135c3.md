# Mutant 4ab135c3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 6665
**Stable ID**: 4ab135c3
**Location**: L374:23–L374:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6665
@@ -370,9 +370,9 @@
         },
       ];
 
       // Apply patches multiple times to ensure stability
-      for (let i = 0; i < 5; i++) {
+      for (let i = 0; i <= 5; i++) {
         const patches = suggestTagPatches(currentInput, issues);
         currentInput = applyEntityPatches<TagInput>(
           currentInput,
           patches,
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
