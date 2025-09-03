# Mutant ea28350a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1405
**Stable ID**: ea28350a
**Location**: L662:15–L663:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1405
@@ -658,10 +658,9 @@
 
           const patches = draft.getPatches();
           const questionPatch = patches.find(
             (patch) =>
-              typeof patch === "object" &&
-              patch !== null &&
+              true &&
               "question" in patch,
           );
           expect(questionPatch).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
