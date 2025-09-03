# Mutant e81ced96 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6746
**Stable ID**: e81ced96
**Location**: L519:17–L519:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6746
@@ -515,9 +515,9 @@
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
-          code: "invalid",
+          code: "",
           message: "Invalid relatedTags",
         },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
