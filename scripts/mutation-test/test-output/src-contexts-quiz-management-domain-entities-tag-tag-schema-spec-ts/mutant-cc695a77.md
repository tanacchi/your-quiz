# Mutant cc695a77 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7011
**Stable ID**: cc695a77
**Location**: L153:84–L162:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7011
@@ -149,19 +149,10 @@
           expect(result.data.relatedTags).toEqual([]);
         }
       });
 
-      it("should accept undefined relatedTags and transform to empty array", () => {
-        const { relatedTags: _relatedTags, ...dataWithoutRelatedTags } =
-          validTagData;
-        const result = TagSchema.safeParse(dataWithoutRelatedTags);
-        expect(result.success).toBe(true);
+      it("should accept undefined relatedTags and transform to empty array", () => {});
 
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
-      });
-
       it("should accept multiple related tags", () => {
         const dataWithMultipleRelatedTags = {
           ...validTagData,
           relatedTags: [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
