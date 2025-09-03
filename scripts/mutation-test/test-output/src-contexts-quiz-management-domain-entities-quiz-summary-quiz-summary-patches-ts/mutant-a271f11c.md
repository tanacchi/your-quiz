# Mutant a271f11c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: StringLiteral
**Original ID**: 4892
**Stable ID**: a271f11c
**Location**: L162:12–L162:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4892
@@ -158,9 +158,9 @@
   if (need("question")) out.push(...suggestQuestionPatches(input.question));
   if (need("explanation"))
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
-  if (need("solutionId"))
+  if (need(""))
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
   if (need("creatorId"))
     out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   if (need("answerType"))
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
