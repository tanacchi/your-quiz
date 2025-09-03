# Mutant 0b636a00 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 4747
**Stable ID**: 0b636a00
**Location**: L655:14–L655:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4747
@@ -651,9 +651,9 @@
       if (!patch) throw new Error("Expected patch to exist");
       const materializedPatch = materializeEntityPatch(patch);
 
       expect(Array.isArray(materializedPatch.tagIds)).toBe(true);
-      expect(materializedPatch.tagIds?.length).toBeLessThan(largeTagIds.length);
+      expect(materializedPatch.tagIds.length).toBeLessThan(largeTagIds.length);
 
       // Check that empty strings were filtered out and strings were trimmed
       materializedPatch.tagIds?.forEach((tagId) => {
         expect(tagId).not.toBe("");
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
