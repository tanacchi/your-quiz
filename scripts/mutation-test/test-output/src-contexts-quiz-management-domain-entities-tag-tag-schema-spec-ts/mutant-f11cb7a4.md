# Mutant f11cb7a4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7049
**Stable ID**: f11cb7a4
**Location**: L197:28–L197:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7049
@@ -193,9 +193,9 @@
       describe("Related Tag Object Validation", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
           ["missing id", { relationType: "category", name: "Test" }],
-          ["missing name", { relationType: "category", id: "tag-1" }],
+          ["missing name", {}],
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
           ],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
