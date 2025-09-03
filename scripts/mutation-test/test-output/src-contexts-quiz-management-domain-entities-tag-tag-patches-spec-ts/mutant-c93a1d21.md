# Mutant c93a1d21 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6760
**Stable ID**: c93a1d21
**Location**: L553:17–L553:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6760
@@ -549,9 +549,9 @@
 
       const mixedIssues: Issue[] = [
         {
           path: ["relatedTags"],
-          code: "required",
+          code: "",
           message: "RelatedTags is required",
         },
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
