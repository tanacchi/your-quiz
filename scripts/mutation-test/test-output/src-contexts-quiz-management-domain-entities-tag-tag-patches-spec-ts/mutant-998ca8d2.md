# Mutant 998ca8d2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6440
**Stable ID**: 998ca8d2
**Location**: L72:19–L72:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6440
@@ -68,9 +68,9 @@
         it("should not modify valid relatedTags", () => {
           const validRelatedTags = [
             {
               relationType: "synonym" as const,
-              id: "tag-syn",
+              id: "",
               name: "Synonym Tag",
             },
           ];
           const input = { ...validTagInput, relatedTags: validRelatedTags };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
