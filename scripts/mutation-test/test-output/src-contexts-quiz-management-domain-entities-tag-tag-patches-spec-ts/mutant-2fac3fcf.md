# Mutant 2fac3fcf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6400
**Stable ID**: 2fac3fcf
**Location**: L33:59–L33:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6400
@@ -29,9 +29,9 @@
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
         ["valid array", [], []],
         [
           "valid array with items",
-          [{ relationType: "category", id: "tag-1", name: "Test" }],
+          [{ relationType: "category", id: "tag-1", name: "" }],
           [],
         ],
         ["non-null non-undefined value", [], []],
         ["empty string", "", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
