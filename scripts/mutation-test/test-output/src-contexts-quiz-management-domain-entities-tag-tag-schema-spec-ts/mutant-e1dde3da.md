# Mutant e1dde3da Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7034
**Stable ID**: e1dde3da
**Location**: L193:16–L193:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7034
@@ -189,9 +189,9 @@
           expect(result.data.relatedTags).toHaveLength(3);
         }
       });
 
-      describe("Related Tag Object Validation", () => {
+      describe("", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
           ["missing id", { relationType: "category", name: "Test" }],
           ["missing name", { relationType: "category", id: "tag-1" }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
