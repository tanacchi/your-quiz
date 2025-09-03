# Mutant aca6cc47 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1515
**Stable ID**: aca6cc47
**Location**: L809:13–L809:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1515
@@ -805,9 +805,9 @@
 
       if (result.isErr()) {
         const questionPatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
+            typeof patch === "object" || patch !== null && "question" in patch,
         );
         expect(questionPatch).toBeDefined();
       }
     });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
