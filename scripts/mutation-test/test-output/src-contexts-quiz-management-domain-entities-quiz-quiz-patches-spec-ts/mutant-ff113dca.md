# Mutant ff113dca Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2060
**Stable ID**: ff113dca
**Location**: L330:43–L360:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2060
@@ -326,39 +326,9 @@
         const result = suggestSolutionPatches(validSolution);
         expect(result).toEqual([]);
       });
 
-      describe("Patch Application", () => {
-        it("should apply default solution patch correctly", () => {
-          const mockTimestamp = 1234567890;
-          vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-          const input = { ...validQuizInput, solution: null };
-          const patches = suggestSolutionPatches(input.solution);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.solution).toEqual({
-            id: `solution-${mockTimestamp}`,
-            value: false,
-          });
-
-          vi.restoreAllMocks();
-        });
-
-        it("should apply solution correction patch correctly", () => {
-          const input = {
-            ...validQuizInput,
-            solution: { id: "  solution-123  ", value: "true" },
-          };
-          const patches = suggestSolutionPatches(input.solution);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.solution).toEqual({
-            id: "solution-123",
-            value: true,
-          });
-        });
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
       it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
