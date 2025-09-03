# Mutant ae864824 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7045
**Stable ID**: ae864824
**Location**: L196:42–L196:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7045
@@ -192,9 +192,9 @@
 
       describe("Related Tag Object Validation", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
-          ["missing id", { relationType: "category", name: "Test" }],
+          ["missing id", { relationType: "", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
             "invalid relationType",
             { relationType: "invalid", id: "tag-1", name: "Test" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
