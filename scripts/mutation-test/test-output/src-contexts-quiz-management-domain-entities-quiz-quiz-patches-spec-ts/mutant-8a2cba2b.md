# Mutant 8a2cba2b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2260
**Stable ID**: 8a2cba2b
**Location**: L546:13–L546:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2260
@@ -542,9 +542,9 @@
         const hasQuestionPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
             "question" in patch &&
-            patch.question === "Sample boolean question?",
+            true,
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
             typeof patch === "object" &&
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
