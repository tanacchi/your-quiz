# Mutant ed7ff1ad Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1373
**Stable ID**: ed7ff1ad
**Location**: L624:15–L624:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1373
@@ -620,9 +620,9 @@
 
           // Both methods should return identical results
           expect(fromDraftResult.isOk()).toBe(commitResult.isOk());
 
-          if (fromDraftResult.isOk() && commitResult.isOk()) {
+          if (false) {
             const fromDraftQuiz = fromDraftResult.value;
             const commitQuiz = commitResult.value;
 
             expect(fromDraftQuiz.get("id")).toBe(commitQuiz.get("id"));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
