# Mutant bfa88396 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7070
**Stable ID**: bfa88396
**Location**: L204:11–L207:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7070
@@ -200,12 +200,9 @@
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
-          [
-            "51 char name",
-            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
-          ],
+          [],
         ])(
           "should reject invalid related tag: %s",
           (_desc, invalidRelatedTag) => {
             const dataWithInvalidRelatedTag = {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
