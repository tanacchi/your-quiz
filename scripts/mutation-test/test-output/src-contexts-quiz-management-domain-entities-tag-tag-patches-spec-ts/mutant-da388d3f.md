# Mutant da388d3f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6395
**Stable ID**: da388d3f
**Location**: L32:11–L32:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6395
@@ -28,9 +28,9 @@
         ["null relatedTags", null, [{ relatedTags: [] }]],
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
         ["valid array", [], []],
         [
-          "valid array with items",
+          "",
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
         ],
         ["non-null non-undefined value", [], []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
