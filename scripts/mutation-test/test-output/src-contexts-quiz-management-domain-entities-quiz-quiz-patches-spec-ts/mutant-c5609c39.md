# Mutant c5609c39 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2080
**Stable ID**: c5609c39
**Location**: L363:67–L440:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2080
@@ -359,86 +359,9 @@
         });
       });
     });
 
-    describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
-      it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
-        const quiz = {
-          answerType: "single_choice" as "boolean",
-          solution: { id: "solution-123", value: true },
-        };
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
-        expect(result).toEqual([{ answerType: "boolean" }]);
-      });
-
-      it("should suggest solution when answerType is boolean but no solution", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-        const quiz = {
-          answerType: "boolean" as const,
-          solution: undefined as unknown as BooleanSolutionData,
-        };
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
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
-      it("should not suggest patches when answerType and solution are consistent", () => {
-        const quiz = {
-          answerType: "boolean" as const,
-          solution: { id: "solution-123", value: true },
-        };
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
-        expect(result).toEqual([]);
-      });
-
-      it("should not suggest patches when no answerType or solution", () => {
-        const quiz = {};
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
-        expect(result).toEqual([]);
-      });
-
-      describe("Patch Application", () => {
-        it("should apply answerType consistency patch correctly", () => {
-          const input = {
-            ...validQuizInput,
-            answerType: "single_choice" as "boolean",
-          };
-          const patches = suggestAnswerTypeSolutionConsistencyPatches(input);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.answerType).toBe("boolean");
-        });
-
-        it("should apply solution consistency patch correctly", () => {
-          const mockTimestamp = 1234567890;
-          vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
-
-          const input = {
-            ...validQuizInput,
-            solution: undefined as unknown as BooleanSolutionData,
-          };
-          const patches = suggestAnswerTypeSolutionConsistencyPatches(input);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.solution).toEqual({
-            id: `solution-${mockTimestamp}`,
-            value: false,
-          });
-
-          vi.restoreAllMocks();
-        });
-      });
-    });
+    describe("suggestAnswerTypeSolutionConsistencyPatches", () => {});
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
