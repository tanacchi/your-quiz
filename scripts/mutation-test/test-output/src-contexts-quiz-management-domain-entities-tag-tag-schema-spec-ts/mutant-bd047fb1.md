# Mutant bd047fb1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6994
**Stable ID**: bd047fb1
**Location**: L127:58–L138:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6994
@@ -123,21 +123,10 @@
       });
     });
 
     describe("RelatedTags Field", () => {
-      it("should accept empty related tags array", () => {
-        const dataWithEmptyRelatedTags = {
-          ...validTagData,
-          relatedTags: [],
-        };
-        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
-        expect(result.success).toBe(true);
+      it("should accept empty related tags array", () => {});
 
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
-      });
-
       it("should accept null relatedTags and transform to empty array", () => {
         const dataWithNullRelatedTags = {
           ...validTagData,
           relatedTags: null,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
