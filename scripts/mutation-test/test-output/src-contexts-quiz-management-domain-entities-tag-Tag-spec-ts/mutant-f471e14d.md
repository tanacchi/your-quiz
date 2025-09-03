# Mutant f471e14d Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6162
**Stable ID**: f471e14d
**Location**: L56:37–L133:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6162
@@ -52,87 +52,10 @@
       });
     });
   });
 
-  describe("Entity Creation", () => {
-    it("should create valid tag from complete data", () => {
-      const result = Tag.from(validTagData);
-      expect(result.isOk()).toBe(true);
+  describe("Entity Creation", () => {});
 
-      if (result.isOk()) {
-        const tag = result.value;
-        expect(tag.get("name")).toBe("JavaScript");
-        expect(tag.get("createdBy")).toBe("user-1");
-        expect(tag.get("relatedTags")).toEqual([]);
-      }
-    });
-
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
-
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
-    it("should suggest patches for invalid data", () => {
-      const invalidData = {
-        ...validTagData,
-        relatedTags: null,
-      };
-
-      const result = Tag.from(invalidData);
-      expect(result.isOk()).toBe(true); // null transforms to []
-
-      if (result.isOk()) {
-        const tag = result.value;
-        expect(tag.get("relatedTags")).toEqual([]);
-      }
-    });
-
-    it("should reject invalid name length", () => {
-      const invalidData = {
-        ...validTagData,
-        name: "a".repeat(51), // exceeds 50 char limit
-      };
-
-      const result = Tag.from(invalidData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["name"]);
-      }
-    });
-
-    it("should reject empty name", () => {
-      const invalidData = {
-        ...validTagData,
-        name: "",
-      };
-
-      const result = Tag.from(invalidData);
-      expect(result.isErr()).toBe(true);
-    });
-  });
-
   describe("Validation Rules", () => {
     it("should prevent duplicate related tag IDs", () => {
       const invalidData = {
         ...validTagData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
