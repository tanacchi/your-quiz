# Mutant 8a07dabd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4558
**Stable ID**: 8a07dabd
**Location**: L447:13–L448:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4558
@@ -443,10 +443,9 @@
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
+            true &&
             patch.question === "Sample question",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
