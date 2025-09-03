# Mutant 53bdbf1e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6715
**Stable ID**: 53bdbf1e
**Location**: L455:20–L455:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6715
@@ -451,9 +451,9 @@
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
           code: "required",
-          message: "RelatedTags is required for imported tags",
+          message: "",
         },
       ];
 
       const patches = suggestTagPatches(importedTagInput, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
