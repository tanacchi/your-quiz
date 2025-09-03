# Mutant 50b1ed62 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7068
**Stable ID**: 50b1ed62
**Location**: L203:58–L203:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7068
@@ -199,9 +199,9 @@
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
-          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
+          ["empty name", { relationType: "category", id: "", name: "" }],
           [
             "51 char name",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
           ],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
