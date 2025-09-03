# Mutant 5f30d6ba Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7077
**Stable ID**: 5f30d6ba
**Location**: L210:41–L217:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7077
@@ -206,16 +206,9 @@
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
           ],
         ])(
           "should reject invalid related tag: %s",
-          (_desc, invalidRelatedTag) => {
-            const dataWithInvalidRelatedTag = {
-              ...validTagData,
-              relatedTags: [invalidRelatedTag],
-            };
-            const result = TagSchema.safeParse(dataWithInvalidRelatedTag);
-            expect(result.success).toBe(false);
-          },
+          (_desc, invalidRelatedTag) => {},
         );
 
         it.each([
           ["hierarchy", "hierarchy"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
