# Mutant 2cc239cf Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6176
**Stable ID**: 2cc239cf
**Location**: L69:53–L91:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6176
@@ -65,32 +65,10 @@
         expect(tag.get("relatedTags")).toEqual([]);
       }
     });
 
-    it("should create tag with related tags", () => {
-      const tagWithRelations = {
-        ...validTagData,
-        relatedTags: [
-          {
-            relationType: "hierarchy" as const,
-            id: TagId.parse("tag-2"),
-            name: "Programming",
-          },
-        ],
-      };
+    it("should create tag with related tags", () => {});
 
-      const result = Tag.from(tagWithRelations);
-      expect(result.isOk()).toBe(true);
-
-      if (result.isOk()) {
-        const tag = result.value;
-        const relations = tag.get("relatedTags");
-        expect(relations).toHaveLength(1);
-        expect(relations[0]?.relationType).toBe("hierarchy");
-        expect(relations[0]?.name).toBe("Programming");
-      }
-    });
-
     it("should suggest patches for invalid data", () => {
       const invalidData = {
         ...validTagData,
         relatedTags: null,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
