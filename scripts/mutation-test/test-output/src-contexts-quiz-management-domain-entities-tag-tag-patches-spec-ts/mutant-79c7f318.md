# Mutant 79c7f318 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6377
**Stable ID**: 79c7f318
**Location**: L26:14–L26:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6377
@@ -22,9 +22,9 @@
     ],
   };
 
   describe("Individual Patch Suggesters", () => {
-    describe("suggestRelatedTagsPatches", () => {
+    describe("", () => {
       it.each([
         ["null relatedTags", null, [{ relatedTags: [] }]],
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
         ["valid array", [], []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
