# Mutant a8925ea2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2274
**Stable ID**: a8925ea2
**Location**: L552:13–L552:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2274
@@ -548,9 +548,9 @@
         const hasAnswerTypePatch = result.some(
           (patch) =>
             typeof patch === "object" &&
             "answerType" in patch &&
-            patch.answerType === "boolean",
+            true,
         );
 
         expect(hasIdPatch).toBe(true);
         expect(hasQuestionPatch).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
