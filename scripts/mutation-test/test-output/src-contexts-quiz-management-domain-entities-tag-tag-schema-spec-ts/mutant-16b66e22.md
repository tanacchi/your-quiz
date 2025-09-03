# Mutant 16b66e22 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7053
**Stable ID**: 16b66e22
**Location**: L199:13–L199:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7053
@@ -195,9 +195,9 @@
           ["missing relationType", { id: "tag-1", name: "Test" }],
           ["missing id", { relationType: "category", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
-            "invalid relationType",
+            "",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
