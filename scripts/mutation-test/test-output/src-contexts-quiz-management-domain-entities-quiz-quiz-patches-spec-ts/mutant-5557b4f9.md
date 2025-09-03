# Mutant 5557b4f9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2091
**Stable ID**: 5557b4f9
**Location**: L373:86–L392:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2091
@@ -369,29 +369,10 @@
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([{ answerType: "boolean" }]);
       });
 
-      it("should suggest solution when answerType is boolean but no solution", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
+      it("should suggest solution when answerType is boolean but no solution", () => {});
 
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
       it("should not suggest patches when answerType and solution are consistent", () => {
         const quiz = {
           answerType: "boolean" as const,
           solution: { id: "solution-123", value: true },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
