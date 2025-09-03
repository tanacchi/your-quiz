# Mutant 5e0a9a5c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6420
**Stable ID**: 5e0a9a5c
**Location**: L46:12–L46:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6420
@@ -42,9 +42,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply null relatedTags patch correctly", () => {
+        it("", () => {
           const input = { ...validTagInput, relatedTags: null };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
