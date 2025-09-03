# Mutant c908a289 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2053
**Stable ID**: c908a289
**Location**: L324:10–L324:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2053
@@ -320,9 +320,9 @@
         // SolutionId accepts whitespace, so no patch should be suggested for valid solution
         expect(result).toEqual([]);
       });
 
-      it("should not suggest patch for valid solution", () => {
+      it("", () => {
         const validSolution = { id: "solution-123", value: true };
         const result = suggestSolutionPatches(validSolution);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
