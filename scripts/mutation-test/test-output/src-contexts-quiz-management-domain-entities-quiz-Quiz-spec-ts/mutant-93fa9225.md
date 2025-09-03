# Mutant 93fa9225 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1336
**Stable ID**: 93fa9225
**Location**: L565:15–L565:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1336
@@ -561,9 +561,9 @@
           const originalQuestion = draft.get("question");
           const originalId = draft.get("id");
           const originalSolution = draft.get("solution");
 
-          if (draft.hasErrors()) {
+          if (true) {
             const patches = draft.getPatches();
             draft.applyPatches(patches);
           }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
