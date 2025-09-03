# Mutant a4c986d5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4728
**Stable ID**: a4c986d5
**Location**: L643:63–L662:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4728
@@ -639,26 +639,7 @@
       expect(result).toHaveLength(1);
       expect(result[0]).toEqual({ question: "untrimmed" });
     });
 
-    it("should handle large tagIds arrays efficiently", () => {
-      const largeTagIds = Array.from({ length: 1000 }, (_, i) =>
-        i % 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : `tag-${i}`,
-      );
-
-      const patches = suggestTagIdsPatches(largeTagIds);
-      expect(patches).toHaveLength(1);
-      const patch = patches[0];
-      if (!patch) throw new Error("Expected patch to exist");
-      const materializedPatch = materializeEntityPatch(patch);
-
-      expect(Array.isArray(materializedPatch.tagIds)).toBe(true);
-      expect(materializedPatch.tagIds?.length).toBeLessThan(largeTagIds.length);
-
-      // Check that empty strings were filtered out and strings were trimmed
-      materializedPatch.tagIds?.forEach((tagId) => {
-        expect(tagId).not.toBe("");
-        expect(tagId.trim()).toBe(tagId);
-      });
-    });
+    it("should handle large tagIds arrays efficiently", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
