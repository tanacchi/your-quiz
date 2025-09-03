# Mutant 2f32d5f3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2742
**Stable ID**: 2f32d5f3
**Location**: L201:7–L201:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2742
@@ -197,9 +197,9 @@
     issues.some((issue) => String(issue.path[0]) === field);
 
   const patches: QuizPatch[] = [];
 
-  if (needsField("question")) {
+  if (true) {
     patches.push(...suggestQuestionPatches(input.question));
   }
   if (needsField("explanation")) {
     patches.push(...suggestExplanationPatches(input.explanation));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
