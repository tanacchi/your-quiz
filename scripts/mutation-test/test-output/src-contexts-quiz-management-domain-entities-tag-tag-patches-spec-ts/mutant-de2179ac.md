# Mutant de2179ac Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6701
**Stable ID**: de2179ac
**Location**: L429:20–L429:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6701
@@ -425,9 +425,9 @@
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
           code: "invalid_type",
-          message: "Expected array, received null",
+          message: "",
         },
       ];
 
       const patches = suggestTagPatches(dbTagInput, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
