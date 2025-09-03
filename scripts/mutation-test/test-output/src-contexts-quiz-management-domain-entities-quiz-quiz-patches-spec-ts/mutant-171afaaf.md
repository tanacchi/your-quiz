# Mutant 171afaaf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2000
**Stable ID**: 171afaaf
**Location**: L226:46–L361:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2000
@@ -222,145 +222,10 @@
         });
       });
     });
 
-    describe("suggestSolutionPatches", () => {
-      it("should handle null solution", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
+    describe("suggestSolutionPatches", () => {});
 
-        const result = suggestSolutionPatches(null);
-        expect(result).toEqual([
-          {
-            solution: {
-              id: `solution-${mockTimestamp}`,
-              value: false,
-            },
-          },
-        ]);
-
-        vi.restoreAllMocks();
-      });
-
-      it("should handle undefined solution", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-        const result = suggestSolutionPatches(undefined);
-        expect(result).toEqual([
-          {
-            solution: {
-              id: `solution-${mockTimestamp}`,
-              value: false,
-            },
-          },
-        ]);
-
-        vi.restoreAllMocks();
-      });
-
-      it("should handle invalid solution object", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-        const invalidSolution = { invalidField: "test" };
-        const result = suggestSolutionPatches(invalidSolution);
-
-        expect(result).toEqual([
-          {
-            solution: {
-              id: `solution-${mockTimestamp}`,
-              value: false,
-            },
-          },
-        ]);
-
-        vi.restoreAllMocks();
-      });
-
-      it("should handle solution with invalid id", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-        const solutionWithInvalidId = { id: 123, value: true };
-        const result = suggestSolutionPatches(solutionWithInvalidId);
-
-        expect(result).toEqual([
-          {
-            solution: {
-              id: `solution-${mockTimestamp}`,
-              value: true,
-            },
-          },
-        ]);
-
-        vi.restoreAllMocks();
-      });
-
-      it("should handle solution with valid id but invalid value", () => {
-        const solutionWithInvalidValue = { id: "valid-id", value: "true" };
-        const result = suggestSolutionPatches(solutionWithInvalidValue);
-
-        expect(result).toEqual([
-          {
-            solution: {
-              id: "valid-id",
-              value: true,
-            },
-          },
-        ]);
-      });
-
-      it("should handle solution with whitespace id", () => {
-        const solutionWithWhitespaceId = {
-          id: "  solution-123  ",
-          value: false,
-        };
-        const result = suggestSolutionPatches(solutionWithWhitespaceId);
-
-        // SolutionId accepts whitespace, so no patch should be suggested for valid solution
-        expect(result).toEqual([]);
-      });
-
-      it("should not suggest patch for valid solution", () => {
-        const validSolution = { id: "solution-123", value: true };
-        const result = suggestSolutionPatches(validSolution);
-        expect(result).toEqual([]);
-      });
-
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
-    });
-
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
       it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
         const quiz = {
           answerType: "single_choice" as "boolean",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
