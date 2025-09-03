# Mutant c4ab4dd0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7041
**Stable ID**: c4ab4dd0
**Location**: L195:57–L195:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7041
@@ -191,9 +191,9 @@
       });
 
       describe("Related Tag Object Validation", () => {
         it.each([
-          ["missing relationType", { id: "tag-1", name: "Test" }],
+          ["missing relationType", { id: "tag-1", name: "" }],
           ["missing id", { relationType: "category", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
           [
             "invalid relationType",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
