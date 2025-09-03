# Mutant 7c6c1fe8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6441
**Stable ID**: 7c6c1fe8
**Location**: L73:21–L73:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6441
@@ -69,9 +69,9 @@
           const validRelatedTags = [
             {
               relationType: "synonym" as const,
               id: "tag-syn",
-              name: "Synonym Tag",
+              name: "",
             },
           ];
           const input = { ...validTagInput, relatedTags: validRelatedTags };
           const patches = suggestRelatedTagsPatches(input.relatedTags);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
