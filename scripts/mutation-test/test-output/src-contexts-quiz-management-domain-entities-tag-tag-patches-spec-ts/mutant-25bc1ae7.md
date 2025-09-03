# Mutant 25bc1ae7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6766
**Stable ID**: 25bc1ae7
**Location**: L559:20–L559:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6766
@@ -555,9 +555,9 @@
         },
         {
           path: ["relatedTags"],
           code: "invalid_type",
-          message: "Expected array",
+          message: "",
         },
         {
           path: ["relatedTags"],
           code: "custom",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
