# Mutant f4c71c8a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6652
**Stable ID**: f4c71c8a
**Location**: L356:59–L385:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6652
@@ -352,38 +352,9 @@
       expect(result).toHaveLength(1);
       expect(result[0]).toEqual({ relatedTags: [] });
     });
 
-    it("should handle repeated patch applications", () => {
-      let currentInput = {
-        id: "tag-123",
-        name: "Test Tag",
-        createdBy: "user-456",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
-
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "invalid",
-          message: "Invalid relatedTags",
-        },
-      ];
-
-      // Apply patches multiple times to ensure stability
-      for (let i = 0; i < 5; i++) {
-        const patches = suggestTagPatches(currentInput, issues);
-        currentInput = applyEntityPatches<TagInput>(
-          currentInput,
-          patches,
-        ) as typeof currentInput;
-      }
-
-      expect(currentInput.relatedTags).toEqual([]);
-      expect(currentInput.id).toBe("tag-123");
-      expect(currentInput.name).toBe("Test Tag");
-    });
+    it("should handle repeated patch applications", () => {});
   });
 
   describe("Real-world Scenarios", () => {
     it("should handle tag creation with missing relatedTags", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
