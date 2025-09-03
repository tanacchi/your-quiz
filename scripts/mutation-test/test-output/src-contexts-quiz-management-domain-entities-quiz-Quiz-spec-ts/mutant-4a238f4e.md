# Mutant 4a238f4e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 1513
**Stable ID**: 4a238f4e
**Location**: L809:13–L809:79

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1513
@@ -805,9 +805,9 @@
 
       if (result.isErr()) {
         const questionPatch = result.error.patches.find(
           (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
+            typeof patch === "object" && patch !== null || "question" in patch,
         );
         expect(questionPatch).toBeDefined();
       }
     });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
