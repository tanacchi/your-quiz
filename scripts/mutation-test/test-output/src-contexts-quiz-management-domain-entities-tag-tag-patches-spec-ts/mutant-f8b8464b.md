# Mutant f8b8464b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6391
**Stable ID**: f8b8464b
**Location**: L30:10–L30:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6391
@@ -26,9 +26,9 @@
     describe("suggestRelatedTagsPatches", () => {
       it.each([
         ["null relatedTags", null, [{ relatedTags: [] }]],
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
-        ["valid array", [], []],
+        ["", [], []],
         [
           "valid array with items",
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
