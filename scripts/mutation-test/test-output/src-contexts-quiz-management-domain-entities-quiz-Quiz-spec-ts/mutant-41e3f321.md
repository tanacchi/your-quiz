# Mutant 41e3f321 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1407
**Stable ID**: 41e3f321
**Location**: L662:15–L662:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1407
@@ -658,9 +658,9 @@
 
           const patches = draft.getPatches();
           const questionPatch = patches.find(
             (patch) =>
-              typeof patch === "object" &&
+              true &&
               patch !== null &&
               "question" in patch,
           );
           expect(questionPatch).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
