# Mutant ecdb9826 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2171
**Stable ID**: ecdb9826
**Location**: L485:13–L485:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2171
@@ -481,9 +481,9 @@
         const hasQuestionPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
             "question" in patch &&
-            patch.question === "Valid question?",
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
