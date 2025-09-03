# Mutant fb842b5c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4376
**Stable ID**: fb842b5c
**Location**: L264:59–L276:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4376
@@ -260,22 +260,10 @@
 
           expect(patched.tagIds).toEqual([]);
         });
 
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
+        it("should apply function patch correctly", () => {});
 
-          expect(patched.tagIds).toEqual(["valid", "trimmed"]);
-        });
-
         it("should materialize function patch correctly", () => {
           const input = ["valid", "", " trimmed "];
           const patches = suggestTagIdsPatches(input);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
