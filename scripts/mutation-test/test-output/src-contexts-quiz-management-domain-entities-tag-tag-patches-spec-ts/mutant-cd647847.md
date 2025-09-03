# Mutant cd647847 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6673
**Stable ID**: cd647847
**Location**: L388:42–L469:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6673
@@ -384,91 +384,10 @@
       expect(currentInput.name).toBe("Test Tag");
     });
   });
 
-  describe("Real-world Scenarios", () => {
-    it("should handle tag creation with missing relatedTags", () => {
-      const newTagInput = {
-        id: "tag-new-language",
-        name: "Rust",
-        createdBy: "user-rust-enthusiast",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        // relatedTags not provided
-      };
+  describe("Real-world Scenarios", () => {});
 
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
-    it("should handle tag with null relatedTags from database", () => {
-      const dbTagInput = {
-        id: "tag-from-db",
-        name: "Database Tag",
-        createdBy: "user-db",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null, // Common when field is nullable in database
-      };
-
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "invalid_type",
-          message: "Expected array, received null",
-        },
-      ];
-
-      const patches = suggestTagPatches(dbTagInput, issues);
-      const fixedInput: TagInput = applyEntityPatches<TagInput>(
-        dbTagInput,
-        patches,
-      ) as TagInput;
-
-      expect(fixedInput.relatedTags).toEqual([]);
-    });
-
-    it("should handle tag import from external source", () => {
-      const importedTagInput = {
-        id: "tag-imported",
-        name: "Imported Tag",
-        createdBy: "user-importer",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: undefined, // Common when importing from sources that don't have this field
-      };
-
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "required",
-          message: "RelatedTags is required for imported tags",
-        },
-      ];
-
-      const patches = suggestTagPatches(importedTagInput, issues);
-      const fixedInput: TagInput = applyEntityPatches<TagInput>(
-        importedTagInput,
-        patches,
-      ) as TagInput;
-
-      expect(fixedInput.relatedTags).toEqual([]);
-      expect(fixedInput.id).toBe("tag-imported");
-      expect(fixedInput.name).toBe("Imported Tag");
-    });
-  });
-
   describe("Consistency and Reliability", () => {
     it("should be idempotent - applying patches multiple times should give same result", () => {
       const input = {
         id: "tag-consistency",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
