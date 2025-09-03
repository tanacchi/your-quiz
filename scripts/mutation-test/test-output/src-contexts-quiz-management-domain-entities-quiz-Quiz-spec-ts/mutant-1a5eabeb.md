# Mutant 1a5eabeb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1410
**Stable ID**: 1a5eabeb
**Location**: L663:15–L663:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1410
@@ -659,9 +659,9 @@
           const patches = draft.getPatches();
           const questionPatch = patches.find(
             (patch) =>
               typeof patch === "object" &&
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
