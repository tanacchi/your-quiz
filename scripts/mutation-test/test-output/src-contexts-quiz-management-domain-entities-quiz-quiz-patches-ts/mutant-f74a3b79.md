# Mutant f74a3b79 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2750
**Stable ID**: f74a3b79
**Location**: L207:7–L207:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2750
@@ -203,9 +203,9 @@
   }
   if (needsField("explanation")) {
     patches.push(...suggestExplanationPatches(input.explanation));
   }
-  if (needsField("id")) {
+  if (true) {
     patches.push(...suggestIdFieldPatches("id")(input.id));
   }
   if (needsField("creatorId")) {
     patches.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
