# Mutant 98ff7b17 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1414
**Stable ID**: 98ff7b17
**Location**: L668:15–L668:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1414
@@ -664,9 +664,9 @@
               "question" in patch,
           );
           expect(questionPatch).toBeDefined();
 
-          if (questionPatch) {
+          if (false) {
             draft.applyPatches([questionPatch]);
 
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
