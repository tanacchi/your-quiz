# Mutant 07e426c6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6690
**Stable ID**: 07e426c6
**Location**: L416:71–L440:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6690
@@ -412,34 +412,10 @@
       expect(fixedInput.relatedTags).toEqual([]);
       expect(fixedInput.name).toBe("Rust");
     });
 
-    it("should handle tag with null relatedTags from database", () => {
-      const dbTagInput = {
-        id: "tag-from-db",
-        name: "Database Tag",
-        createdBy: "user-db",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null, // Common when field is nullable in database
-      };
+    it("should handle tag with null relatedTags from database", () => {});
 
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
     it("should handle tag import from external source", () => {
       const importedTagInput = {
         id: "tag-imported",
         name: "Imported Tag",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
