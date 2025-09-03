# Mutant 5ea8ba8d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7039
**Stable ID**: 5ea8ba8d
**Location**: L195:36–L195:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7039
@@ -191,9 +191,9 @@
       });
 
       describe("Related Tag Object Validation", () => {
         it.each([
-          ["missing relationType", { id: "tag-1", name: "Test" }],
+          ["missing relationType", {}],
           ["missing id", { relationType: "category", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
             "invalid relationType",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
