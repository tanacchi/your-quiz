# Mutant f4942d06 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4569
**Stable ID**: f4942d06
**Location**: L453:13–L455:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4569
@@ -449,11 +449,9 @@
             patch.question === "Sample question",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
+            true,
         );
 
         expect(hasIdPatch).toBe(true);
         expect(hasQuestionPatch).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
