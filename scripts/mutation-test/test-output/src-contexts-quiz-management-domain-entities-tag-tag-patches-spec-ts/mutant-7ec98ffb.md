# Mutant 7ec98ffb Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6414
**Stable ID**: 7ec98ffb
**Location**: L39:10–L39:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6414
@@ -35,9 +35,9 @@
         ],
         ["non-null non-undefined value", [], []],
         ["empty string", "", []],
         ["number", 123, []],
-        ["object", {}, []],
+        ["", {}, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestRelatedTagsPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
