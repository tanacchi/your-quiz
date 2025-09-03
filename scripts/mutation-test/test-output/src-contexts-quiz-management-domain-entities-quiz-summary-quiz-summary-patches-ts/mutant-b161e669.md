# Mutant b161e669 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: StringLiteral
**Original ID**: 4885
**Stable ID**: b161e669
**Location**: L159:12–L159:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4885
@@ -155,9 +155,9 @@
 
   const out: QuizSummaryPatch[] = [];
 
   if (need("question")) out.push(...suggestQuestionPatches(input.question));
-  if (need("explanation"))
+  if (need(""))
     out.push(...suggestExplanationPatches(input.explanation));
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
   if (need("solutionId"))
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
