# Mutant 45ed5fce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2256
**Stable ID**: 45ed5fce
**Location**: L544:13–L544:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2256
@@ -540,9 +540,9 @@
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
+            true &&
             "question" in patch &&
             patch.question === "Sample boolean question?",
         );
         const hasAnswerTypePatch = result.some(
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
