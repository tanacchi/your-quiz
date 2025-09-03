# Mutant 02d2d032 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6686
**Stable ID**: 02d2d032
**Location**: L402:20–L402:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6686
@@ -398,9 +398,9 @@
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
           code: "required",
-          message: "RelatedTags field is required",
+          message: "",
         },
       ];
 
       const patches = suggestTagPatches(newTagInput, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
