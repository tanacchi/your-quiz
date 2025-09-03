# Mutant 4ab7e156 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7052
**Stable ID**: 4ab7e156
**Location**: L198:11–L201:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7052
@@ -194,12 +194,9 @@
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
           ["missing id", { relationType: "category", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
-          [
-            "invalid relationType",
-            { relationType: "invalid", id: "tag-1", name: "Test" },
-          ],
+          [],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
             "51 char name",
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
