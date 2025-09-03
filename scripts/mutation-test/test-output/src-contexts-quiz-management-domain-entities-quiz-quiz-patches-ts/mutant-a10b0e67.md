# Mutant a10b0e67 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2764
**Stable ID**: a10b0e67
**Location**: L216:7–L216:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2764
@@ -212,9 +212,9 @@
   }
   if (needsField("answerType")) {
     patches.push(...suggestAnswerTypePatches(input.answerType));
   }
-  if (needsField("status")) {
+  if (true) {
     patches.push(...suggestStatusPatches(input.status));
   }
   if (needsField("solution")) {
     patches.push(...suggestSolutionPatches(input.solution));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
