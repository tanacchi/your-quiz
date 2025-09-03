# Mutant 14af0cb1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 4748
**Stable ID**: 14af0cb1
**Location**: L658:7–L658:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4748
@@ -654,9 +654,9 @@
       expect(Array.isArray(materializedPatch.tagIds)).toBe(true);
       expect(materializedPatch.tagIds?.length).toBeLessThan(largeTagIds.length);
 
       // Check that empty strings were filtered out and strings were trimmed
-      materializedPatch.tagIds?.forEach((tagId) => {
+      materializedPatch.tagIds.forEach((tagId) => {
         expect(tagId).not.toBe("");
         expect(tagId.trim()).toBe(tagId);
       });
     });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
