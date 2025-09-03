# Mutant 36b799b0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6430
**Stable ID**: 36b799b0
**Location**: L58:25–L58:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6430
@@ -54,9 +54,9 @@
           expect(patched.relatedTags).toEqual([]);
         });
 
         it("should apply undefined relatedTags patch correctly", () => {
-          const input = { ...validTagInput, relatedTags: undefined };
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
