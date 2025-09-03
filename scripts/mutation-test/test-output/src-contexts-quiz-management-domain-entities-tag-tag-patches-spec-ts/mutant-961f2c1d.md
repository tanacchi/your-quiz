# Mutant 961f2c1d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6396
**Stable ID**: 961f2c1d
**Location**: L33:11–L33:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6396
@@ -29,10 +29,10 @@
         ["undefined relatedTags", undefined, [{ relatedTags: [] }]],
         ["valid array", [], []],
         [
           "valid array with items",
-          [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
+          [],
         ],
         ["non-null non-undefined value", [], []],
         ["empty string", "", []],
         ["number", 123, []],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
