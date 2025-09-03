# Mutant f13b8f75 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7172
**Stable ID**: f13b8f75
**Location**: L326:53–L349:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7172
@@ -322,32 +322,9 @@
           );
         }
       });
 
-      it("should handle multiple duplicates", () => {
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
-        const result = TagSchema.safeParse(dataWithMultipleDuplicates);
-        expect(result.success).toBe(false);
-      });
+      it("should handle multiple duplicates", () => {});
     });
 
     describe("Self-Reference Prevention", () => {
       it("should accept tag with no self-reference", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
