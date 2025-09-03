# Mutant d250609b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1534
**Stable ID**: d250609b
**Location**: L826:13–L827:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1534
@@ -822,10 +822,9 @@
 
       if (result.isErr()) {
         const answerTypePatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" &&
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
