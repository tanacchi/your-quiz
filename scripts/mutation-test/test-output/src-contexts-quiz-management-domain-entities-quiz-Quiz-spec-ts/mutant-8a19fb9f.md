# Mutant 8a19fb9f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1536
**Stable ID**: 8a19fb9f
**Location**: L826:13–L826:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1536
@@ -822,9 +822,9 @@
 
       if (result.isErr()) {
         const answerTypePatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" &&
+            true &&
             patch !== null &&
             "answerType" in patch,
         );
         expect(answerTypePatch).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
