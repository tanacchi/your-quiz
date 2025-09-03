# Mutant 8e29221a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6433
**Stable ID**: 8e29221a
**Location**: L62:15–L62:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6433
@@ -58,9 +58,9 @@
           const input = { ...validTagInput, relatedTags: undefined };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
+          if (false) throw new Error("Expected patch to exist");
           const patched = applyEntityPatch(input, patch);
 
           expect(patched.relatedTags).toEqual([]);
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
