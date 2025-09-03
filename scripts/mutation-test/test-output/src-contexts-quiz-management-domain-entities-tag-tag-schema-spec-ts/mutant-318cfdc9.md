# Mutant 318cfdc9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6991
**Stable ID**: 318cfdc9
**Location**: L126:14–L126:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6991
@@ -122,9 +122,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("RelatedTags Field", () => {
+    describe("", () => {
       it("should accept empty related tags array", () => {
         const dataWithEmptyRelatedTags = {
           ...validTagData,
           relatedTags: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
