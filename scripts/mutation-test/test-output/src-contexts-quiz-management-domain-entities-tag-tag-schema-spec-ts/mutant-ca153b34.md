# Mutant ca153b34 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7072
**Stable ID**: ca153b34
**Location**: L206:13–L206:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7072
@@ -202,9 +202,9 @@
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
             "51 char name",
-            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
+            {},
           ],
         ])(
           "should reject invalid related tag: %s",
           (_desc, invalidRelatedTag) => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
