# Mutant 257ef390 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6416
**Stable ID**: 257ef390
**Location**: L40:10–L40:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6416
@@ -36,9 +36,9 @@
         ["non-null non-undefined value", [], []],
         ["empty string", "", []],
         ["number", 123, []],
         ["object", {}, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      ])("", (_desc, input, expected) => {
         const result = suggestRelatedTagsPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
