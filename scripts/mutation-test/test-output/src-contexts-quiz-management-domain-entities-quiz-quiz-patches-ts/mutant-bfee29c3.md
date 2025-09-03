# Mutant bfee29c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2746
**Stable ID**: bfee29c3
**Location**: L204:7–L204:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2746
@@ -200,9 +200,9 @@
 
   if (needsField("question")) {
     patches.push(...suggestQuestionPatches(input.question));
   }
-  if (needsField("explanation")) {
+  if (true) {
     patches.push(...suggestExplanationPatches(input.explanation));
   }
   if (needsField("id")) {
     patches.push(...suggestIdFieldPatches("id")(input.id));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
