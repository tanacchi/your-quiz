# Mutant 29a5c804 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2167
**Stable ID**: 29a5c804
**Location**: L483:13–L483:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2167
@@ -479,9 +479,9 @@
         expect(result.length).toBeGreaterThanOrEqual(2);
 
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
+            true &&
             "question" in patch &&
             patch.question === "Valid question?",
         );
         const hasAnswerTypePatch = result.some(
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
