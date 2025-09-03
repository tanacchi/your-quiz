# Mutant aecaee7f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6386
**Stable ID**: aecaee7f
**Location**: L29:10–L29:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6386
@@ -25,9 +25,9 @@
   describe("Individual Patch Suggesters", () => {
     describe("suggestRelatedTagsPatches", () => {
       it.each([
         ["null relatedTags", null, [{ relatedTags: [] }]],
-        ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
+        ["", undefined, [{ relatedTags: [] }]],
         ["valid array", [], []],
         [
           "valid array with items",
           [{ relationType: "category", id: "tag-1", name: "Test" }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
