# Mutant 70e4497f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7018
**Stable ID**: 70e4497f
**Location**: L164:55–L191:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7018
@@ -160,37 +160,10 @@
           expect(result.data.relatedTags).toEqual([]);
         }
       });
 
-      it("should accept multiple related tags", () => {
-        const dataWithMultipleRelatedTags = {
-          ...validTagData,
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-789",
-              name: "Programming Languages",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-999",
-              name: "TS",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-111",
-              name: "JavaScript",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithMultipleRelatedTags);
-        expect(result.success).toBe(true);
+      it("should accept multiple related tags", () => {});
 
-        if (result.success) {
-          expect(result.data.relatedTags).toHaveLength(3);
-        }
-      });
-
       describe("Related Tag Object Validation", () => {
         it.each([
           ["missing relationType", { id: "tag-1", name: "Test" }],
           ["missing id", { relationType: "category", name: "Test" }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
