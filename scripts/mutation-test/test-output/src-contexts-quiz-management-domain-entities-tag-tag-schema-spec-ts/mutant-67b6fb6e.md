# Mutant 67b6fb6e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7008
**Stable ID**: 67b6fb6e
**Location**: L148:29–L150:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7008
@@ -144,11 +144,9 @@
         };
         const result = TagSchema.safeParse(dataWithNullRelatedTags);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.relatedTags).toEqual([]);
-        }
+        if (result.success) {}
       });
 
       it("should accept undefined relatedTags and transform to empty array", () => {
         const { relatedTags: _relatedTags, ...dataWithoutRelatedTags } =
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
