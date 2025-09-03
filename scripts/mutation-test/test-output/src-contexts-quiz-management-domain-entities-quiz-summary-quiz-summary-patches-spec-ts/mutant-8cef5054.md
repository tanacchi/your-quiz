# Mutant 8cef5054 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4368
**Stable ID**: 8cef5054
**Location**: L253:62–L262:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4368
@@ -249,19 +249,10 @@
         expect(patchResult.tagIds).toEqual(["tag-1", "tag-2"]);
       });
 
       describe("Patch Application", () => {
-        it("should apply null tagIds patch correctly", () => {
-          const input = { ...validQuizSummaryInput, tagIds: null };
-          const patches = suggestTagIdsPatches(input.tagIds);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
+        it("should apply null tagIds patch correctly", () => {});
 
-          expect(patched.tagIds).toEqual([]);
-        });
-
         it("should apply function patch correctly", () => {
           const input = {
             ...validQuizSummaryInput,
             tagIds: ["valid", "", " trimmed "],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
