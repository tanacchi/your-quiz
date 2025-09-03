# Mutant d9cf283c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6764
**Stable ID**: d9cf283c
**Location**: L557:18–L557:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6764
@@ -553,9 +553,9 @@
           code: "required",
           message: "RelatedTags is required",
         },
         {
-          path: ["relatedTags"],
+          path: [""],
           code: "invalid_type",
           message: "Expected array",
         },
         {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
