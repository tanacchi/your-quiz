# Mutant b59fb673 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6535
**Stable ID**: b59fb673
**Location**: L182:20–L182:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6535
@@ -178,9 +178,9 @@
             code: "invalid",
             message: "Invalid relatedTags",
           },
           {
-            path: ["relatedTags", 0],
+            path: ["", 0],
             code: "invalid",
             message: "Invalid related tag",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
