# Mutant 47f238d2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6403
**Stable ID**: 47f238d2
**Location**: L36:10–L36:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6403
@@ -32,9 +32,9 @@
           "valid array with items",
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
         ],
-        ["non-null non-undefined value", [], []],
+        ["", [], []],
         ["empty string", "", []],
         ["number", 123, []],
         ["object", {}, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
