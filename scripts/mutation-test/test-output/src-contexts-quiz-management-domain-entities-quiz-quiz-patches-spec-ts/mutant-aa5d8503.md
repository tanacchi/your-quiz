# Mutant aa5d8503 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2304
**Stable ID**: aa5d8503
**Location**: L584:13–L584:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2304
@@ -580,9 +580,9 @@
         const hasConsistencyPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
             "answerType" in patch &&
-            patch.answerType === "boolean",
+            true,
         );
         expect(hasConsistencyPatch).toBe(true);
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
