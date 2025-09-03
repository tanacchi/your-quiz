# Mutant 926fa84f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4744
**Stable ID**: 926fa84f
**Location**: L651:11–L651:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4744
@@ -647,9 +647,9 @@
 
       const patches = suggestTagIdsPatches(largeTagIds);
       expect(patches).toHaveLength(1);
       const patch = patches[0];
-      if (!patch) throw new Error("Expected patch to exist");
+      if (false) throw new Error("Expected patch to exist");
       const materializedPatch = materializeEntityPatch(patch);
 
       expect(Array.isArray(materializedPatch.tagIds)).toBe(true);
       expect(materializedPatch.tagIds?.length).toBeLessThan(largeTagIds.length);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
