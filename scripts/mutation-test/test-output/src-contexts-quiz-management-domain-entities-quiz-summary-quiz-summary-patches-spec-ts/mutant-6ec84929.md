# Mutant 6ec84929 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4144
**Stable ID**: 6ec84929
**Location**: L94:43–L108:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4144
@@ -90,23 +90,9 @@
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
-        it("should apply trim patch correctly", () => {
-          const input = {
-            ...validQuizSummaryInput,
-            explanation: "  Untrimmed explanation  ",
-          };
-          const patches = suggestExplanationPatches(input.explanation);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.explanation).toBe("Untrimmed explanation");
-        });
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestIdFieldPatches", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
