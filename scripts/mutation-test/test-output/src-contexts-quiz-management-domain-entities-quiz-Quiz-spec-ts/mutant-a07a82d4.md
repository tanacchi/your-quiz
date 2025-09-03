# Mutant a07a82d4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1539
**Stable ID**: a07a82d4
**Location**: L827:13–L827:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1539
@@ -823,9 +823,9 @@
       if (result.isErr()) {
         const answerTypePatch = result.error.patches.find(
           (patch) =>
             typeof patch === "object" &&
-            patch !== null &&
+            true &&
             "answerType" in patch,
         );
         expect(answerTypePatch).toBeDefined();
         if (
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
