# Mutant 2130fe4c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6675
**Stable ID**: 2130fe4c
**Location**: L389:69–L414:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6675
@@ -385,35 +385,10 @@
     });
   });
 
   describe("Real-world Scenarios", () => {
-    it("should handle tag creation with missing relatedTags", () => {
-      const newTagInput = {
-        id: "tag-new-language",
-        name: "Rust",
-        createdBy: "user-rust-enthusiast",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        // relatedTags not provided
-      };
+    it("should handle tag creation with missing relatedTags", () => {});
 
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "required",
-          message: "RelatedTags field is required",
-        },
-      ];
-
-      const patches = suggestTagPatches(newTagInput, issues);
-      const fixedInput: TagInput = applyEntityPatches<TagInput>(
-        newTagInput,
-        patches,
-      ) as TagInput;
-
-      expect(fixedInput.relatedTags).toEqual([]);
-      expect(fixedInput.name).toBe("Rust");
-    });
-
     it("should handle tag with null relatedTags from database", () => {
       const dbTagInput = {
         id: "tag-from-db",
         name: "Database Tag",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
