# Mutant 914dd4bf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6761
**Stable ID**: 914dd4bf
**Location**: L554:20–L554:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6761
@@ -550,9 +550,9 @@
       const mixedIssues: Issue[] = [
         {
           path: ["relatedTags"],
           code: "required",
-          message: "RelatedTags is required",
+          message: "",
         },
         {
           path: ["relatedTags"],
           code: "invalid_type",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
