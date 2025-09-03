# Mutant ec91fcca Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4146
**Stable ID**: ec91fcca
**Location**: L95:55–L107:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4146
@@ -91,21 +91,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
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
+        it("should apply trim patch correctly", () => {});
       });
     });
 
     describe("suggestIdFieldPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
