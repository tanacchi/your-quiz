# Mutant e9a71c57 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7003
**Stable ID**: e9a71c57
**Location**: L140:79–L151:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7003
@@ -136,21 +136,10 @@
           expect(result.data.relatedTags).toEqual([]);
         }
       });
 
-      it("should accept null relatedTags and transform to empty array", () => {
-        const dataWithNullRelatedTags = {
-          ...validTagData,
-          relatedTags: null,
-        };
-        const result = TagSchema.safeParse(dataWithNullRelatedTags);
-        expect(result.success).toBe(true);
+      it("should accept null relatedTags and transform to empty array", () => {});
 
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
-      });
-
       it("should accept undefined relatedTags and transform to empty array", () => {
         const { relatedTags: _relatedTags, ...dataWithoutRelatedTags } =
           validTagData;
         const result = TagSchema.safeParse(dataWithoutRelatedTags);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
