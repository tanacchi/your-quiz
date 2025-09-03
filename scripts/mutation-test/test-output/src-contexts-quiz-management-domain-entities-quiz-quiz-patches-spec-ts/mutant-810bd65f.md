# Mutant 810bd65f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2270
**Stable ID**: 810bd65f
**Location**: L550:13–L550:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2270
@@ -546,9 +546,9 @@
             patch.question === "Sample boolean question?",
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
