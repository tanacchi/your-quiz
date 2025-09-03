# Mutant d3656b7b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7047
**Stable ID**: d3656b7b
**Location**: L197:11–L197:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7047
@@ -193,9 +193,9 @@
       describe("Related Tag Object Validation", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
           ["missing id", { relationType: "category", name: "Test" }],
-          ["missing name", { relationType: "category", id: "tag-1" }],
+          [],
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
