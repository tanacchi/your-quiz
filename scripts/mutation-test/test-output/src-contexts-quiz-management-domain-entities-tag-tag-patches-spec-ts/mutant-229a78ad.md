# Mutant 229a78ad Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6421
**Stable ID**: 229a78ad
**Location**: L46:67–L55:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6421
@@ -42,19 +42,10 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply null relatedTags patch correctly", () => {
-          const input = { ...validTagInput, relatedTags: null };
-          const patches = suggestRelatedTagsPatches(input.relatedTags);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
+        it("should apply null relatedTags patch correctly", () => {});
 
-          expect(patched.relatedTags).toEqual([]);
-        });
-
         it("should apply undefined relatedTags patch correctly", () => {
           const input = { ...validTagInput, relatedTags: undefined };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
