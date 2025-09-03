# Mutant d9bcd806 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6765
**Stable ID**: d9bcd806
**Location**: L558:17–L558:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6765
@@ -554,9 +554,9 @@
           message: "RelatedTags is required",
         },
         {
           path: ["relatedTags"],
-          code: "invalid_type",
+          code: "",
           message: "Expected array",
         },
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
