# Mutant a02d7ec9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2106
**Stable ID**: a02d7ec9
**Location**: L403:10–L403:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2106
@@ -399,9 +399,9 @@
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
 
-      it("should not suggest patches when no answerType or solution", () => {
+      it("", () => {
         const quiz = {};
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
