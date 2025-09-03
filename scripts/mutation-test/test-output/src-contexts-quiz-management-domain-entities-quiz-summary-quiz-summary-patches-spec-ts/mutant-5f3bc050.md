# Mutant 5f3bc050 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4366
**Stable ID**: 5f3bc050
**Location**: L252:43–L288:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4366
@@ -248,45 +248,9 @@
         const patchResult = functionPatch();
         expect(patchResult.tagIds).toEqual(["tag-1", "tag-2"]);
       });
 
-      describe("Patch Application", () => {
-        it("should apply null tagIds patch correctly", () => {
-          const input = { ...validQuizSummaryInput, tagIds: null };
-          const patches = suggestTagIdsPatches(input.tagIds);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.tagIds).toEqual([]);
-        });
-
-        it("should apply function patch correctly", () => {
-          const input = {
-            ...validQuizSummaryInput,
-            tagIds: ["valid", "", " trimmed "],
-          };
-          const patches = suggestTagIdsPatches(input.tagIds);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.tagIds).toEqual(["valid", "trimmed"]);
-        });
-
-        it("should materialize function patch correctly", () => {
-          const input = ["valid", "", " trimmed "];
-          const patches = suggestTagIdsPatches(input);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const materializedPatch = materializeEntityPatch(patch);
-
-          expect(materializedPatch.tagIds).toEqual(["valid", "trimmed"]);
-        });
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestApprovedAtPatches", () => {
       it("should suggest approvedAt for approved status without timestamp", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
