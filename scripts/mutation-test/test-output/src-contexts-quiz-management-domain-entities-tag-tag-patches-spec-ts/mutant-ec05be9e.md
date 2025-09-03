# Mutant ec05be9e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6536
**Stable ID**: ec05be9e
**Location**: L183:19–L183:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6536
@@ -179,9 +179,9 @@
             message: "Invalid relatedTags",
           },
           {
             path: ["relatedTags", 0],
-            code: "invalid",
+            code: "",
             message: "Invalid related tag",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
