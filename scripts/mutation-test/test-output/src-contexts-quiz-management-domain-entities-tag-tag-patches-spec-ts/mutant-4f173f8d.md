# Mutant 4f173f8d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6439
**Stable ID**: 4f173f8d
**Location**: L70:13–L74:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6439
@@ -66,13 +66,9 @@
         });
 
         it("should not modify valid relatedTags", () => {
           const validRelatedTags = [
-            {
-              relationType: "synonym" as const,
-              id: "tag-syn",
-              name: "Synonym Tag",
-            },
+            {},
           ];
           const input = { ...validTagInput, relatedTags: validRelatedTags };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
