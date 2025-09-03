# Mutant 2d539a8e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2082
**Stable ID**: 2d539a8e
**Location**: L364:107–L371:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2082
@@ -360,16 +360,9 @@
       });
     });
 
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
-      it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
-        const quiz = {
-          answerType: "single_choice" as "boolean",
-          solution: { id: "solution-123", value: true },
-        };
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
-        expect(result).toEqual([{ answerType: "boolean" }]);
-      });
+      it("should suggest answerType correction when solution exists but answerType is not boolean", () => {});
 
       it("should suggest solution when answerType is boolean but no solution", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
