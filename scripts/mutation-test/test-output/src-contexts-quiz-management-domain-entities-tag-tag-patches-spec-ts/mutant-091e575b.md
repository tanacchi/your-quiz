# Mutant 091e575b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6534
**Stable ID**: 091e575b
**Location**: L182:19–L182:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6534
@@ -178,9 +178,9 @@
             code: "invalid",
             message: "Invalid relatedTags",
           },
           {
-            path: ["relatedTags", 0],
+            path: [],
             code: "invalid",
             message: "Invalid related tag",
           },
         ];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
