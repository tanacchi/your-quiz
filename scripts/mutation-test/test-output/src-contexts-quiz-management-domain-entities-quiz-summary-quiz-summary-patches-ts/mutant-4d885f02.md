# Mutant 4d885f02 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 4891
**Stable ID**: 4d885f02
**Location**: L162:7–L162:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4891
@@ -158,9 +158,9 @@
   if (need("question")) out.push(...suggestQuestionPatches(input.question));
   if (need("explanation"))
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
-  if (need("solutionId"))
+  if (false)
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
   if (need("creatorId"))
     out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   if (need("answerType"))
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
