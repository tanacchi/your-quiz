# Mutant 581984bc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1374
**Stable ID**: 581984bc
**Location**: L624:15–L624:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1374
@@ -620,9 +620,9 @@
 
           // Both methods should return identical results
           expect(fromDraftResult.isOk()).toBe(commitResult.isOk());
 
-          if (fromDraftResult.isOk() && commitResult.isOk()) {
+          if (fromDraftResult.isOk() || commitResult.isOk()) {
             const fromDraftQuiz = fromDraftResult.value;
             const commitQuiz = commitResult.value;
 
             expect(fromDraftQuiz.get("id")).toBe(commitQuiz.get("id"));
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
