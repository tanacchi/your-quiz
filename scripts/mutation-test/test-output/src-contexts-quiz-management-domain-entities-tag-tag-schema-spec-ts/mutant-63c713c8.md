# Mutant 63c713c8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7015
**Stable ID**: 63c713c8
**Location**: L159:29–L161:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7015
@@ -155,11 +155,9 @@
           validTagData;
         const result = TagSchema.safeParse(dataWithoutRelatedTags);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
+        if (result.success) {}
       });
 
       it("should accept multiple related tags", () => {
         const dataWithMultipleRelatedTags = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
