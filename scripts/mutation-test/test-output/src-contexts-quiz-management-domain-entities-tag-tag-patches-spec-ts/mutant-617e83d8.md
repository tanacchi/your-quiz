# Mutant 617e83d8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6429
**Stable ID**: 617e83d8
**Location**: L57:72–L66:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6429
@@ -53,19 +53,10 @@
 
           expect(patched.relatedTags).toEqual([]);
         });
 
-        it("should apply undefined relatedTags patch correctly", () => {
-          const input = { ...validTagInput, relatedTags: undefined };
-          const patches = suggestRelatedTagsPatches(input.relatedTags);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
+        it("should apply undefined relatedTags patch correctly", () => {});
 
-          expect(patched.relatedTags).toEqual([]);
-        });
-
         it("should not modify valid relatedTags", () => {
           const validRelatedTags = [
             {
               relationType: "synonym" as const,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
