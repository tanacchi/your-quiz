# Mutant ff122571 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 4884
**Stable ID**: ff122571
**Location**: L159:7–L159:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4884
@@ -155,9 +155,9 @@
 
   const out: QuizSummaryPatch[] = [];
 
   if (need("question")) out.push(...suggestQuestionPatches(input.question));
-  if (need("explanation"))
+  if (false)
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
   if (need("solutionId"))
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
