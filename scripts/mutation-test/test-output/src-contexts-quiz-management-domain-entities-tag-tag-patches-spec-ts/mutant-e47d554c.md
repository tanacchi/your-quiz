# Mutant e47d554c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6722
**Stable ID**: e47d554c
**Location**: L472:96–L505:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6722
@@ -468,43 +468,10 @@
     });
   });
 
   describe("Consistency and Reliability", () => {
-    it("should be idempotent - applying patches multiple times should give same result", () => {
-      const input = {
-        id: "tag-consistency",
-        name: "Consistency Test",
-        createdBy: "user-tester",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
+    it("should be idempotent - applying patches multiple times should give same result", () => {});
 
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "invalid",
-          message: "Invalid relatedTags",
-        },
-      ];
-
-      const firstApplication: TagInput = applyEntityPatches<TagInput>(
-        input,
-        suggestTagPatches(input, issues),
-      ) as TagInput;
-      const secondApplication: TagInput = applyEntityPatches<TagInput>(
-        firstApplication,
-        suggestTagPatches(firstApplication, issues),
-      ) as TagInput;
-      const thirdApplication: TagInput = applyEntityPatches<TagInput>(
-        secondApplication,
-        suggestTagPatches(secondApplication, issues),
-      ) as TagInput;
-
-      expect(firstApplication).toEqual(secondApplication);
-      expect(secondApplication).toEqual(thirdApplication);
-      expect(firstApplication.relatedTags).toEqual([]);
-    });
-
     it("should maintain referential integrity of non-patched fields", () => {
       const originalInput = {
         id: "tag-integrity",
         name: "Integrity Test",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
