# Mutant 51c101c3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7312
**Stable ID**: 51c101c3
**Location**: L516:49–L535:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7312
@@ -512,28 +512,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Large Related Tags Arrays", () => {
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
-    });
+    describe("Large Related Tags Arrays", () => {});
   });
 
   describe("Integration Scenarios", () => {
     it("should handle tag with hierarchical relationships", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
