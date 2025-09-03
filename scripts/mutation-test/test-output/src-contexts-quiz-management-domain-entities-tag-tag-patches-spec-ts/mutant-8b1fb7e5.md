# Mutant 8b1fb7e5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6375
**Stable ID**: 8b1fb7e5
**Location**: L25:12–L25:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6375
@@ -21,9 +21,9 @@
       },
     ],
   };
 
-  describe("Individual Patch Suggesters", () => {
+  describe("", () => {
     describe("suggestRelatedTagsPatches", () => {
       it.each([
         ["null relatedTags", null, [{ relatedTags: [] }]],
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
