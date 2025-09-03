# Mutant f11d9a7d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6700
**Stable ID**: f11d9a7d
**Location**: L428:17–L428:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6700
@@ -424,9 +424,9 @@
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
-          code: "invalid_type",
+          code: "",
           message: "Expected array, received null",
         },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
