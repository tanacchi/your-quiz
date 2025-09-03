# Mutant d38c6990 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6374
**Stable ID**: d38c6990
**Location**: L20:15–L20:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6374
@@ -16,9 +16,9 @@
     relatedTags: [
       {
         relationType: "category",
         id: "tag-789",
-        name: "Programming Languages",
+        name: "",
       },
     ],
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
