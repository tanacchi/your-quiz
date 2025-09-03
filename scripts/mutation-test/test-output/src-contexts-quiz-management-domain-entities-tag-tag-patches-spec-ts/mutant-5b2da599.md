# Mutant 5b2da599 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6629
**Stable ID**: 5b2da599
**Location**: L325:20–L325:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6629
@@ -321,9 +321,9 @@
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
           code: "required",
-          message: "RelatedTags is required",
+          message: "",
         },
       ];
 
       const result = suggestTagPatches(inputWithoutRelatedTags, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
