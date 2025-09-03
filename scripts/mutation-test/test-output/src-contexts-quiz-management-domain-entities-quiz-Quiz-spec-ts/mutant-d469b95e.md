# Mutant d469b95e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1531
**Stable ID**: d469b95e
**Location**: L826:13–L828:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1531
@@ -822,11 +822,9 @@
 
       if (result.isErr()) {
         const answerTypePatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" &&
-            patch !== null &&
-            "answerType" in patch,
+            true,
         );
         expect(answerTypePatch).toBeDefined();
         if (
           answerTypePatch &&
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
