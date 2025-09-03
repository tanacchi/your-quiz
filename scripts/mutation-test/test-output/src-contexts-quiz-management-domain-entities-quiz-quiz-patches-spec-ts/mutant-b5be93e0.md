# Mutant b5be93e0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2084
**Stable ID**: b5be93e0
**Location**: L367:21–L367:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2084
@@ -363,9 +363,9 @@
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
       it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
         const quiz = {
           answerType: "single_choice" as "boolean",
-          solution: { id: "solution-123", value: true },
+          solution: {},
         };
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([{ answerType: "boolean" }]);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
