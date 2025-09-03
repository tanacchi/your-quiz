# Mutant 3d8e6213 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2755
**Stable ID**: 3d8e6213
**Location**: L210:7–L210:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2755
@@ -206,9 +206,9 @@
   }
   if (needsField("id")) {
     patches.push(...suggestIdFieldPatches("id")(input.id));
   }
-  if (needsField("creatorId")) {
+  if (true) {
     patches.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
   }
   if (needsField("answerType")) {
     patches.push(...suggestAnswerTypePatches(input.answerType));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
