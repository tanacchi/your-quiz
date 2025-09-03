# Mutant 5a7cb809 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6264
**Stable ID**: 5a7cb809
**Location**: L217:49–L228:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6264
@@ -213,21 +213,10 @@
       expect(result.isOk()).toBe(true);
       tag = result._unsafeUnwrap();
     });
 
-    it("should get related tags by type", () => {
-      const hierarchyTags = tag.getRelatedTagsByType("hierarchy");
-      expect(hierarchyTags).toHaveLength(1);
-      expect(hierarchyTags[0]?.name).toBe("Programming");
+    it("should get related tags by type", () => {});
 
-      const categoryTags = tag.getRelatedTagsByType("category");
-      expect(categoryTags).toHaveLength(1);
-      expect(categoryTags[0]?.name).toBe("Web Development");
-
-      const synonymTags = tag.getRelatedTagsByType("synonym");
-      expect(synonymTags).toHaveLength(0);
-    });
-
     it("should check relation existence", () => {
       expect(tag.hasRelationWith(TagId.parse("tag-2"))).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-2"), "hierarchy")).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-2"), "category")).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
