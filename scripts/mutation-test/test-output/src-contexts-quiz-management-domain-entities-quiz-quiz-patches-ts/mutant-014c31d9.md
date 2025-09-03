# Mutant 014c31d9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2760
**Stable ID**: 014c31d9
**Location**: L213:7–L213:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2760
@@ -209,9 +209,9 @@
   }
   if (needsField("creatorId")) {
     patches.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   }
-  if (needsField("answerType")) {
+  if (true) {
     patches.push(...suggestAnswerTypePatches(input.answerType));
   }
   if (needsField("status")) {
     patches.push(...suggestStatusPatches(input.status));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
