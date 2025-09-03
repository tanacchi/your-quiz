# Mutant 7d284b7d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7314
**Stable ID**: 7d284b7d
**Location**: L517:51–L534:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7314
@@ -513,26 +513,9 @@
       });
     });
 
     describe("Large Related Tags Arrays", () => {
-      it("should handle many related tags", () => {
-        const manyRelatedTags = Array.from({ length: 20 }, (_, i) => ({
-          relationType: "related" as const,
-          id: `tag-${i}`,
-          name: `Related Tag ${i}`,
-        }));
-
-        const data = {
-          ...validTagData,
-          relatedTags: manyRelatedTags,
-        };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.relatedTags).toHaveLength(20);
-        }
-      });
+      it("should handle many related tags", () => {});
     });
   });
 
   describe("Integration Scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
