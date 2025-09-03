# Mutant f553fed3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6714
**Stable ID**: f553fed3
**Location**: L454:17–L454:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6714
@@ -450,9 +450,9 @@
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
-          code: "required",
+          code: "",
           message: "RelatedTags is required for imported tags",
         },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
