# Mutant ac593227 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6609
**Stable ID**: ac593227
**Location**: L300:79–L310:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6609
@@ -296,20 +296,10 @@
         expect(result).toEqual([]);
       });
     });
 
-    it("should preserve original input when no patches are applicable", () => {
-      const input = { ...validTagInput };
-      const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
-      ];
+    it("should preserve original input when no patches are applicable", () => {});
 
-      const patches = suggestTagPatches(input, issues);
-      const patched = applyEntityPatches<TagInput>(input, patches);
-
-      expect(patched).toEqual(input);
-    });
-
     it("should handle input without relatedTags field", () => {
       const inputWithoutRelatedTags = {
         id: "tag-123",
         name: "Test Tag",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
