# Mutant 492caca1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6704
**Stable ID**: 492caca1
**Location**: L442:63–L468:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6704
@@ -438,35 +438,9 @@
 
       expect(fixedInput.relatedTags).toEqual([]);
     });
 
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
+    it("should handle tag import from external source", () => {});
   });
 
   describe("Consistency and Reliability", () => {
     it("should be idempotent - applying patches multiple times should give same result", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
