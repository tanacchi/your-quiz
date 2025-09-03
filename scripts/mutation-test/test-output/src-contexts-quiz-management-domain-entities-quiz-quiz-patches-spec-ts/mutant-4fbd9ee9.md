# Mutant 4fbd9ee9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2117
**Stable ID**: 4fbd9ee9
**Location**: L421:71–L438:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2117
@@ -417,26 +417,9 @@
 
           expect(patched.answerType).toBe("boolean");
         });
 
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
+        it("should apply solution consistency patch correctly", () => {});
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
