# Mutant 44fd693d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4555
**Stable ID**: 44fd693d
**Location**: L447:13–L449:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4555
@@ -443,11 +443,9 @@
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
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
