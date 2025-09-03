# Mutant 9b267f58 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6378
**Stable ID**: 9b267f58
**Location**: L26:49–L82:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6378
@@ -22,65 +22,9 @@
     ],
   };
 
   describe("Individual Patch Suggesters", () => {
-    describe("suggestRelatedTagsPatches", () => {
-      it.each([
-        ["null relatedTags", null, [{ relatedTags: [] }]],
-        ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
-        ["valid array", [], []],
-        [
-          "valid array with items",
-          [{ relationType: "category", id: "tag-1", name: "Test" }],
-          [],
-        ],
-        ["non-null non-undefined value", [], []],
-        ["empty string", "", []],
-        ["number", 123, []],
-        ["object", {}, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestRelatedTagsPatches(input);
-        expect(result).toEqual(expected);
-      });
-
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
-    });
+    describe("suggestRelatedTagsPatches", () => {});
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestTagPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
