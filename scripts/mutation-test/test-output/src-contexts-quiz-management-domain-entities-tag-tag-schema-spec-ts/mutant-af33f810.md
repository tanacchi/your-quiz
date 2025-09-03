# Mutant af33f810 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7066
**Stable ID**: af33f810
**Location**: L203:26–L203:77

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7066
@@ -199,9 +199,9 @@
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
-          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
+          ["empty name", {}],
           [
             "51 char name",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
           ],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
