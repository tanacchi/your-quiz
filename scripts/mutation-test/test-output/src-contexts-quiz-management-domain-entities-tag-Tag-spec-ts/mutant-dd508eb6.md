# Mutant dd508eb6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6252
**Stable ID**: dd508eb6
**Location**: L192:36–L237:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6252
@@ -188,55 +188,10 @@
       }
     });
   });
 
-  describe("Business Logic", () => {
-    let tag: Tag;
+  describe("Business Logic", () => {});
 
-    beforeEach(() => {
-      const tagWithRelations = {
-        ...validTagData,
-        relatedTags: [
-          {
-            relationType: "hierarchy" as const,
-            id: TagId.parse("tag-2"),
-            name: "Programming",
-          },
-          {
-            relationType: "category" as const,
-            id: TagId.parse("tag-3"),
-            name: "Web Development",
-          },
-        ],
-      };
-
-      const result = Tag.from(tagWithRelations);
-      expect(result.isOk()).toBe(true);
-      tag = result._unsafeUnwrap();
-    });
-
-    it("should get related tags by type", () => {
-      const hierarchyTags = tag.getRelatedTagsByType("hierarchy");
-      expect(hierarchyTags).toHaveLength(1);
-      expect(hierarchyTags[0]?.name).toBe("Programming");
-
-      const categoryTags = tag.getRelatedTagsByType("category");
-      expect(categoryTags).toHaveLength(1);
-      expect(categoryTags[0]?.name).toBe("Web Development");
-
-      const synonymTags = tag.getRelatedTagsByType("synonym");
-      expect(synonymTags).toHaveLength(0);
-    });
-
-    it("should check relation existence", () => {
-      expect(tag.hasRelationWith(TagId.parse("tag-2"))).toBe(true);
-      expect(tag.hasRelationWith(TagId.parse("tag-2"), "hierarchy")).toBe(true);
-      expect(tag.hasRelationWith(TagId.parse("tag-2"), "category")).toBe(false);
-      expect(tag.hasRelationWith(TagId.parse("tag-3"), "category")).toBe(true);
-      expect(tag.hasRelationWith(TagId.parse("tag-999"))).toBe(false);
-    });
-  });
-
   describe("Draft Usage", () => {
     it("should work with Draft pattern", () => {
       const draft = new Tag.Draft();
       draft.update("name", "TypeScript");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
