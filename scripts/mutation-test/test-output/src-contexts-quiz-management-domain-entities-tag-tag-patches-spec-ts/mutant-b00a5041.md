# Mutant b00a5041 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6736
**Stable ID**: b00a5041
**Location**: L507:77–L539:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6736
@@ -503,42 +503,10 @@
       expect(secondApplication).toEqual(thirdApplication);
       expect(firstApplication.relatedTags).toEqual([]);
     });
 
-    it("should maintain referential integrity of non-patched fields", () => {
-      const originalInput = {
-        id: "tag-integrity",
-        name: "Integrity Test",
-        createdBy: "user-integrity",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
+    it("should maintain referential integrity of non-patched fields", () => {});
 
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "invalid",
-          message: "Invalid relatedTags",
-        },
-      ];
-
-      const patches = suggestTagPatches(originalInput, issues);
-      const patchedInput: TagInput = applyEntityPatches<TagInput>(
-        originalInput,
-        patches,
-      ) as TagInput;
-
-      // All non-patched fields should remain exactly the same
-      expect(patchedInput.id).toBe(originalInput.id);
-      expect(patchedInput.name).toBe(originalInput.name);
-      expect(patchedInput.createdBy).toBe(originalInput.createdBy);
-      expect(patchedInput.createdAt).toBe(originalInput.createdAt);
-
-      // Only relatedTags should be patched
-      expect(patchedInput.relatedTags).toEqual([]);
-      expect(patchedInput.relatedTags).not.toBe(originalInput.relatedTags);
-    });
-
     it("should handle concurrent issue types gracefully", () => {
       const input = {
         id: "tag-concurrent",
         name: "Concurrent Test",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
