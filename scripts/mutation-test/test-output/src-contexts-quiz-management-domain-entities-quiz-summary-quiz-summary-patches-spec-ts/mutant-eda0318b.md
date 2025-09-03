# Mutant eda0318b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4564
**Stable ID**: eda0318b
**Location**: L449:13–L449:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4564
@@ -445,9 +445,9 @@
         const hasQuestionPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
             "question" in patch &&
-            patch.question === "Sample question",
+            true,
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
             typeof patch === "object" &&
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
