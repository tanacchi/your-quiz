# Mutant 7549ffb9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1519
**Stable ID**: 7549ffb9
**Location**: L809:42–L809:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1519
@@ -805,9 +805,9 @@
 
       if (result.isErr()) {
         const questionPatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
+            typeof patch === "object" && true && "question" in patch,
         );
         expect(questionPatch).toBeDefined();
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
