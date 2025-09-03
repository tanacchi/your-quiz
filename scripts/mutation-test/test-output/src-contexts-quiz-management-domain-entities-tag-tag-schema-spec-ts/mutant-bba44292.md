# Mutant bba44292 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7173
**Stable ID**: bba44292
**Location**: L327:44–L346:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7173
@@ -323,28 +323,9 @@
         }
       });
 
       it("should handle multiple duplicates", () => {
-        const dataWithMultipleDuplicates = {
-          ...validTagData,
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-1",
-              name: "Category 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-1", // duplicate
-              name: "Synonym 1",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-1", // another duplicate
-              name: "Related 1",
-            },
-          ],
-        };
+        const dataWithMultipleDuplicates = {};
         const result = TagSchema.safeParse(dataWithMultipleDuplicates);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
