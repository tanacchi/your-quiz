# Mutant e828f60e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6993
**Stable ID**: e828f60e
**Location**: L127:10–L127:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6993
@@ -123,9 +123,9 @@
       });
     });
 
     describe("RelatedTags Field", () => {
-      it("should accept empty related tags array", () => {
+      it("", () => {
         const dataWithEmptyRelatedTags = {
           ...validTagData,
           relatedTags: [],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
