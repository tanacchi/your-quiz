# Mutant 00f292cc Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6758
**Stable ID**: 00f292cc
**Location**: L552:17–L552:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6758
@@ -548,9 +548,9 @@
       };
 
       const mixedIssues: Issue[] = [
         {
-          path: ["relatedTags"],
+          path: [],
           code: "required",
           message: "RelatedTags is required",
         },
         {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
