# Mutant 4be99707 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4574
**Stable ID**: 4be99707
**Location**: L453:13–L453:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4574
@@ -449,9 +449,9 @@
             patch.question === "Sample question",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
+            true &&
             "answerType" in patch &&
             patch.answerType === "boolean",
         );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
