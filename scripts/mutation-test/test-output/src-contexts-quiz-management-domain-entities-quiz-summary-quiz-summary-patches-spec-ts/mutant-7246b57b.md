# Mutant 7246b57b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4397
**Stable ID**: 7246b57b
**Location**: L283:15–L283:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4397
@@ -279,9 +279,9 @@
           const input = ["valid", "", " trimmed "];
           const patches = suggestTagIdsPatches(input);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
+          if (false) throw new Error("Expected patch to exist");
           const materializedPatch = materializeEntityPatch(patch);
 
           expect(materializedPatch.tagIds).toEqual(["valid", "trimmed"]);
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
