# Mutant 59c58d96 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2107
**Stable ID**: 59c58d96
**Location**: L403:77–L407:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2107
@@ -399,13 +399,9 @@
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
 
-      it("should not suggest patches when no answerType or solution", () => {
-        const quiz = {};
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
-        expect(result).toEqual([]);
-      });
+      it("should not suggest patches when no answerType or solution", () => {});
 
       describe("Patch Application", () => {
         it("should apply answerType consistency patch correctly", () => {
           const input = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
