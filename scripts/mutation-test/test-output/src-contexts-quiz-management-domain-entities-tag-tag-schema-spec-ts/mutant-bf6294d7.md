# Mutant bf6294d7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7042
**Stable ID**: bf6294d7
**Location**: L196:11–L196:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7042
@@ -192,9 +192,9 @@
 
       describe("Related Tag Object Validation", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
-          ["missing id", { relationType: "category", name: "Test" }],
+          [],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
