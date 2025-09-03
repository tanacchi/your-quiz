# Mutant ca7abd73 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6408
**Stable ID**: ca7abd73
**Location**: L37:26–L37:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6408
@@ -33,9 +33,9 @@
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
         ],
         ["non-null non-undefined value", [], []],
-        ["empty string", "", []],
+        ["empty string", "Stryker was here!", []],
         ["number", 123, []],
         ["object", {}, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestRelatedTagsPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
