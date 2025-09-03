# Mutant 5722fc75 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4390
**Stable ID**: 5722fc75
**Location**: L278:65–L287:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4390
@@ -274,18 +274,9 @@
 
           expect(patched.tagIds).toEqual(["valid", "trimmed"]);
         });
 
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
+        it("should materialize function patch correctly", () => {});
       });
     });
 
     describe("suggestApprovedAtPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
