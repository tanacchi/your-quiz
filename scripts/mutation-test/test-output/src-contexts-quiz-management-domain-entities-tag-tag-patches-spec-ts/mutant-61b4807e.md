# Mutant 61b4807e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6428
**Stable ID**: 61b4807e
**Location**: L57:12–L57:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6428
@@ -53,9 +53,9 @@
 
           expect(patched.relatedTags).toEqual([]);
         });
 
-        it("should apply undefined relatedTags patch correctly", () => {
+        it("", () => {
           const input = { ...validTagInput, relatedTags: undefined };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
