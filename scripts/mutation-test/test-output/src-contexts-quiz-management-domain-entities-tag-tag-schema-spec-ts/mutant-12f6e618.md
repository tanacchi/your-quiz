# Mutant 12f6e618 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7000
**Stable ID**: 12f6e618
**Location**: L135:29–L137:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7000
@@ -131,11 +131,9 @@
         };
         const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
+        if (result.success) {}
       });
 
       it("should accept null relatedTags and transform to empty array", () => {
         const dataWithNullRelatedTags = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
