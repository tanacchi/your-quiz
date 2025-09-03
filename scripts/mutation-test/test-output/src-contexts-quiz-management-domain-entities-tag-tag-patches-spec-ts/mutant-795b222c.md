# Mutant 795b222c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6759
**Stable ID**: 795b222c
**Location**: L552:18–L552:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6759
@@ -548,9 +548,9 @@
       };
 
       const mixedIssues: Issue[] = [
         {
-          path: ["relatedTags"],
+          path: [""],
           code: "required",
           message: "RelatedTags is required",
         },
         {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
