# Mutant 09d66ef2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7044
**Stable ID**: 09d66ef2
**Location**: L196:26–L196:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7044
@@ -192,9 +192,9 @@
 
       describe("Related Tag Object Validation", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
-          ["missing id", { relationType: "category", name: "Test" }],
+          ["missing id", {}],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
