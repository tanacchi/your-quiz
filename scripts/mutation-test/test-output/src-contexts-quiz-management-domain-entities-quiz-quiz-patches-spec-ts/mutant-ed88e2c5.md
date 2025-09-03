# Mutant ed88e2c5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2086
**Stable ID**: ed88e2c5
**Location**: L367:50–L367:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2086
@@ -363,9 +363,9 @@
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
       it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
         const quiz = {
           answerType: "single_choice" as "boolean",
-          solution: { id: "solution-123", value: true },
+          solution: { id: "solution-123", value: false },
         };
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([{ answerType: "boolean" }]);
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
