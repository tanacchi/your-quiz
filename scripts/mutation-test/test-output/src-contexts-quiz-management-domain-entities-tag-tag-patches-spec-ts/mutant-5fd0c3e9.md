# Mutant 5fd0c3e9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6417
**Stable ID**: 5fd0c3e9
**Location**: L40:58–L43:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6417
@@ -36,12 +36,9 @@
         ["non-null non-undefined value", [], []],
         ["empty string", "", []],
         ["number", 123, []],
         ["object", {}, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestRelatedTagsPatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply null relatedTags patch correctly", () => {
           const input = { ...validTagInput, relatedTags: null };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
