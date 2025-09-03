# Mutant ce2e7b4d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6411
**Stable ID**: ce2e7b4d
**Location**: L38:10–L38:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6411
@@ -34,9 +34,9 @@
           [],
         ],
         ["non-null non-undefined value", [], []],
         ["empty string", "", []],
-        ["number", 123, []],
+        ["", 123, []],
         ["object", {}, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestRelatedTagsPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
