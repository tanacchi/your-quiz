# Mutant c1263f8a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6422
**Stable ID**: c1263f8a
**Location**: L47:25–L47:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6422
@@ -43,9 +43,9 @@
       });
 
       describe("Patch Application", () => {
         it("should apply null relatedTags patch correctly", () => {
-          const input = { ...validTagInput, relatedTags: null };
+          const input = {};
           const patches = suggestRelatedTagsPatches(input.relatedTags);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
           if (!patch) throw new Error("Expected patch to exist");
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
