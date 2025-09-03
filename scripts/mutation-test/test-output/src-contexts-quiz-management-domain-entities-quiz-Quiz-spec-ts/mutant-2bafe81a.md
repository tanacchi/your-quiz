# Mutant 2bafe81a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1406
**Stable ID**: 2bafe81a
**Location**: L662:15–L663:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1406
@@ -658,10 +658,9 @@
 
           const patches = draft.getPatches();
           const questionPatch = patches.find(
             (patch) =>
-              typeof patch === "object" &&
-              patch !== null &&
+              typeof patch === "object" || patch !== null &&
               "question" in patch,
           );
           expect(questionPatch).toBeDefined();
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
