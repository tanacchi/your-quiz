# Mutant 924da671 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6419
**Stable ID**: 924da671
**Location**: L45:43–L81:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6419
@@ -41,45 +41,9 @@
         const result = suggestRelatedTagsPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
-        it("should apply null relatedTags patch correctly", () => {
-          const input = { ...validTagInput, relatedTags: null };
-          const patches = suggestRelatedTagsPatches(input.relatedTags);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.relatedTags).toEqual([]);
-        });
-
-        it("should apply undefined relatedTags patch correctly", () => {
-          const input = { ...validTagInput, relatedTags: undefined };
-          const patches = suggestRelatedTagsPatches(input.relatedTags);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.relatedTags).toEqual([]);
-        });
-
-        it("should not modify valid relatedTags", () => {
-          const validRelatedTags = [
-            {
-              relationType: "synonym" as const,
-              id: "tag-syn",
-              name: "Synonym Tag",
-            },
-          ];
-          const input = { ...validTagInput, relatedTags: validRelatedTags };
-          const patches = suggestRelatedTagsPatches(input.relatedTags);
-
-          expect(patches).toEqual([]);
-        });
-      });
+      describe("Patch Application", () => {});
     });
   });
 
   describe("Integrated Patch Suggester", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
