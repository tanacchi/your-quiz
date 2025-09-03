# Mutant e83bcaef Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6273
**Stable ID**: e83bcaef
**Location**: L230:49–L236:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6273
@@ -226,15 +226,9 @@
       const synonymTags = tag.getRelatedTagsByType("synonym");
       expect(synonymTags).toHaveLength(0);
     });
 
-    it("should check relation existence", () => {
-      expect(tag.hasRelationWith(TagId.parse("tag-2"))).toBe(true);
-      expect(tag.hasRelationWith(TagId.parse("tag-2"), "hierarchy")).toBe(true);
-      expect(tag.hasRelationWith(TagId.parse("tag-2"), "category")).toBe(false);
-      expect(tag.hasRelationWith(TagId.parse("tag-3"), "category")).toBe(true);
-      expect(tag.hasRelationWith(TagId.parse("tag-999"))).toBe(false);
-    });
+    it("should check relation existence", () => {});
   });
 
   describe("Draft Usage", () => {
     it("should work with Draft pattern", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
