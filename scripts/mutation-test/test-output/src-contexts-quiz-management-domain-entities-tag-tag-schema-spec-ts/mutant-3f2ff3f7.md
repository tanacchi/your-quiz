# Mutant 3f2ff3f7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7064
**Stable ID**: 3f2ff3f7
**Location**: L203:11–L203:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7064
@@ -199,9 +199,9 @@
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
-          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
+          [],
           [
             "51 char name",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
           ],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
