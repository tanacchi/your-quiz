# Mutant 611992ba Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7078
**Stable ID**: 611992ba
**Location**: L211:47–L214:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7078
@@ -207,12 +207,9 @@
           ],
         ])(
           "should reject invalid related tag: %s",
           (_desc, invalidRelatedTag) => {
-            const dataWithInvalidRelatedTag = {
-              ...validTagData,
-              relatedTags: [invalidRelatedTag],
-            };
+            const dataWithInvalidRelatedTag = {};
             const result = TagSchema.safeParse(dataWithInvalidRelatedTag);
             expect(result.success).toBe(false);
           },
         );
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
