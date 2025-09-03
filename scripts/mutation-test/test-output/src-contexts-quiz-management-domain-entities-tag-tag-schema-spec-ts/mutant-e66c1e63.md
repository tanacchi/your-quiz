# Mutant e66c1e63 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7060
**Stable ID**: e66c1e63
**Location**: L202:24–L202:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7060
@@ -198,9 +198,9 @@
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
-          ["empty id", { relationType: "category", id: "", name: "Test" }],
+          ["empty id", {}],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
             "51 char name",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
