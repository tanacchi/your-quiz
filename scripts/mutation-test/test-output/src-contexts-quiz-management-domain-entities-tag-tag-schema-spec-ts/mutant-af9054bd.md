# Mutant af9054bd Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7328
**Stable ID**: af9054bd
**Location**: L539:67–L581:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7328
@@ -535,52 +535,10 @@
     });
   });
 
   describe("Integration Scenarios", () => {
-    it("should handle tag with hierarchical relationships", () => {
-      const hierarchicalTag = {
-        id: "tag-typescript",
-        name: "TypeScript",
-        createdBy: "user-expert",
-        createdAt: "2023-12-01 10:00:00",
-        relatedTags: [
-          {
-            relationType: "hierarchy" as const,
-            id: "tag-programming-languages",
-            name: "Programming Languages",
-          },
-          {
-            relationType: "category" as const,
-            id: "tag-web-development",
-            name: "Web Development",
-          },
-          {
-            relationType: "synonym" as const,
-            id: "tag-ts",
-            name: "TS",
-          },
-          {
-            relationType: "related" as const,
-            id: "tag-javascript",
-            name: "JavaScript",
-          },
-        ],
-      };
+    it("should handle tag with hierarchical relationships", () => {});
 
-      const result = TagSchema.safeParse(hierarchicalTag);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.relatedTags).toHaveLength(4);
-        expect(result.data.relatedTags.map((rt) => rt.relationType)).toEqual([
-          "hierarchy",
-          "category",
-          "synonym",
-          "related",
-        ]);
-      }
-    });
-
     it("should handle minimal tag without related tags", () => {
       const minimalTag = {
         id: "t",
         name: "T",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
