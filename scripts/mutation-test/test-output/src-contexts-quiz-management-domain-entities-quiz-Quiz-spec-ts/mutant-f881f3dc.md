# Mutant f881f3dc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1372
**Stable ID**: f881f3dc
**Location**: L624:15–L624:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1372
@@ -620,9 +620,9 @@
 
           // Both methods should return identical results
           expect(fromDraftResult.isOk()).toBe(commitResult.isOk());
 
-          if (fromDraftResult.isOk() && commitResult.isOk()) {
+          if (true) {
             const fromDraftQuiz = fromDraftResult.value;
             const commitQuiz = commitResult.value;
 
             expect(fromDraftQuiz.get("id")).toBe(commitQuiz.get("id"));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
