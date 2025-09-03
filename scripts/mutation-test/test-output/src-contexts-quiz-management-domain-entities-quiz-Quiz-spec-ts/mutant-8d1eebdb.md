# Mutant 8d1eebdb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1413
**Stable ID**: 8d1eebdb
**Location**: L668:15–L668:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1413
@@ -664,9 +664,9 @@
               "question" in patch,
           );
           expect(questionPatch).toBeDefined();
 
-          if (questionPatch) {
+          if (true) {
             draft.applyPatches([questionPatch]);
 
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
