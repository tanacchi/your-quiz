# Mutant 5cbc0fdf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7057
**Stable ID**: 5cbc0fdf
**Location**: L200:59–L200:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7057
@@ -196,9 +196,9 @@
           ["missing id", { relationType: "category", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
             "invalid relationType",
-            { relationType: "invalid", id: "tag-1", name: "Test" },
+            { relationType: "invalid", id: "tag-1", name: "" },
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
