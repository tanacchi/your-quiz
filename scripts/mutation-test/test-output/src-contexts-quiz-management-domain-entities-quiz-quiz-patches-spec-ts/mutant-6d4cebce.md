# Mutant 6d4cebce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2176
**Stable ID**: 6d4cebce
**Location**: L489:13–L491:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2176
@@ -485,11 +485,9 @@
             patch.question === "Valid question?",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
+            true,
         );
 
         expect(hasQuestionPatch).toBe(true);
         expect(hasAnswerTypePatch).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
