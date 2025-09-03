# Mutant a9e83c64 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6763
**Stable ID**: a9e83c64
**Location**: L557:17–L557:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6763
@@ -553,9 +553,9 @@
           code: "required",
           message: "RelatedTags is required",
         },
         {
-          path: ["relatedTags"],
+          path: [],
           code: "invalid_type",
           message: "Expected array",
         },
         {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
