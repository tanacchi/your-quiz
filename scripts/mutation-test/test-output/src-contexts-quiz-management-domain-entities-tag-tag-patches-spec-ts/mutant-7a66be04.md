# Mutant 7a66be04 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6747
**Stable ID**: 7a66be04
**Location**: L520:20–L520:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6747
@@ -516,9 +516,9 @@
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
           code: "invalid",
-          message: "Invalid relatedTags",
+          message: "",
         },
       ];
 
       const patches = suggestTagPatches(originalInput, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
