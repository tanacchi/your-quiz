# Mutant 1f58bab2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1404
**Stable ID**: 1f58bab2
**Location**: L662:15–L664:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1404
@@ -658,11 +658,9 @@
 
           const patches = draft.getPatches();
           const questionPatch = patches.find(
             (patch) =>
-              typeof patch === "object" &&
-              patch !== null &&
-              "question" in patch,
+              typeof patch === "object" && patch !== null || "question" in patch,
           );
           expect(questionPatch).toBeDefined();
 
           if (questionPatch) {
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
