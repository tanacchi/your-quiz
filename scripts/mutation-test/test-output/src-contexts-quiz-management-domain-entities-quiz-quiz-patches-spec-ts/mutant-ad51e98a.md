# Mutant ad51e98a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2051
**Stable ID**: ad51e98a
**Location**: L316:18–L316:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2051
@@ -312,9 +312,9 @@
 
       it("should handle solution with whitespace id", () => {
         const solutionWithWhitespaceId = {
           id: "  solution-123  ",
-          value: false,
+          value: true,
         };
         const result = suggestSolutionPatches(solutionWithWhitespaceId);
 
         // SolutionId accepts whitespace, so no patch should be suggested for valid solution
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
