# Mutant 7484c93a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6407
**Stable ID**: 7484c93a
**Location**: L37:10–L37:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6407
@@ -33,9 +33,9 @@
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
         ],
         ["non-null non-undefined value", [], []],
-        ["empty string", "", []],
+        ["", "", []],
         ["number", 123, []],
         ["object", {}, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestRelatedTagsPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
