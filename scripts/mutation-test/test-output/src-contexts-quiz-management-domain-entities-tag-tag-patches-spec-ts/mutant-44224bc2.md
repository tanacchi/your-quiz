# Mutant 44224bc2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6379
**Stable ID**: 44224bc2
**Location**: L27:15–L40:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6379
@@ -23,22 +23,9 @@
   };
 
   describe("Individual Patch Suggesters", () => {
     describe("suggestRelatedTagsPatches", () => {
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
+      it.each([])("should handle %s", (_desc, input, expected) => {
         const result = suggestRelatedTagsPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
