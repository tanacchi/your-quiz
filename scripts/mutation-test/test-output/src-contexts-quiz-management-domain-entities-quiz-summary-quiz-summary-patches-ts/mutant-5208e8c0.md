# Mutant 5208e8c0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: StringLiteral
**Original ID**: 4896
**Stable ID**: 5208e8c0
**Location**: L164:12–L164:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4896
@@ -160,9 +160,9 @@
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
   if (need("solutionId"))
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
-  if (need("creatorId"))
+  if (need(""))
     out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   if (need("answerType"))
     out.push(...suggestAnswerTypePatches(input.answerType));
   if (need("status")) out.push(...suggestStatusPatches(input.status));
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
