# Mutant 9a2d9b35 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6537
**Stable ID**: 9a2d9b35
**Location**: L184:22–L184:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6537
@@ -180,9 +180,9 @@
           },
           {
             path: ["relatedTags", 0],
             code: "invalid",
-            message: "Invalid related tag",
+            message: "",
           },
         ];
 
         const result = suggestTagPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
