# Mutant 1d74b941 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 4895
**Stable ID**: 1d74b941
**Location**: L164:7–L164:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4895
@@ -160,9 +160,9 @@
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
   if (need("solutionId"))
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
-  if (need("creatorId"))
+  if (false)
     out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   if (need("answerType"))
     out.push(...suggestAnswerTypePatches(input.answerType));
   if (need("status")) out.push(...suggestStatusPatches(input.status));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
