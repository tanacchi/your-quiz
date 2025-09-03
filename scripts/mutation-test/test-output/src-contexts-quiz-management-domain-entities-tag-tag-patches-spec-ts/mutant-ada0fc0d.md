# Mutant ada0fc0d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6438
**Stable ID**: ada0fc0d
**Location**: L69:36–L75:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6438
@@ -65,15 +65,9 @@
           expect(patched.relatedTags).toEqual([]);
         });
 
         it("should not modify valid relatedTags", () => {
-          const validRelatedTags = [
-            {
-              relationType: "synonym" as const,
-              id: "tag-syn",
-              name: "Synonym Tag",
-            },
-          ];
+          const validRelatedTags = [];
           const input = { ...validTagInput, relatedTags: validRelatedTags };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
 
           expect(patches).toEqual([]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
