# Mutant 5aae4c2e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 4890
**Stable ID**: 5aae4c2e
**Location**: L162:7–L162:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4890
@@ -158,9 +158,9 @@
   if (need("question")) out.push(...suggestQuestionPatches(input.question));
   if (need("explanation"))
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
-  if (need("solutionId"))
+  if (true)
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
   if (need("creatorId"))
     out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   if (need("answerType"))
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
