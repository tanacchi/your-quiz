# Mutant e7c7be11 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6392
**Stable ID**: e7c7be11
**Location**: L30:25–L30:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6392
@@ -26,9 +26,9 @@
     describe("suggestRelatedTagsPatches", () => {
       it.each([
         ["null relatedTags", null, [{ relatedTags: [] }]],
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
-        ["valid array", [], []],
+        ["valid array", ["Stryker was here"], []],
         [
           "valid array with items",
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
