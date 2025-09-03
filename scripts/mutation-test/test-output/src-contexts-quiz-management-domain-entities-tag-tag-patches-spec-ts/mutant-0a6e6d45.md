# Mutant 0a6e6d45 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6404
**Stable ID**: 0a6e6d45
**Location**: L36:42–L36:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6404
@@ -32,9 +32,9 @@
           "valid array with items",
           [{ relationType: "category", id: "tag-1", name: "Test" }],
           [],
         ],
-        ["non-null non-undefined value", [], []],
+        ["non-null non-undefined value", ["Stryker was here"], []],
         ["empty string", "", []],
         ["number", 123, []],
         ["object", {}, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
