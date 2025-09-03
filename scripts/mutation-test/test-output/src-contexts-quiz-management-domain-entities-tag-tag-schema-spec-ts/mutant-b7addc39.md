# Mutant b7addc39 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7063
**Stable ID**: b7addc39
**Location**: L202:66–L202:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7063
@@ -198,9 +198,9 @@
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
-          ["empty id", { relationType: "category", id: "", name: "Test" }],
+          ["empty id", { relationType: "category", id: "", name: "" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
             "51 char name",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
