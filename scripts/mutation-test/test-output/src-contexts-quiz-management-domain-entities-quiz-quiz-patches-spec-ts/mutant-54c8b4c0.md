# Mutant 54c8b4c0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2164
**Stable ID**: 54c8b4c0
**Location**: L483:13–L485:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2164
@@ -479,11 +479,9 @@
         expect(result.length).toBeGreaterThanOrEqual(2);
 
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
-            patch.question === "Valid question?",
+            typeof patch === "object" && "question" in patch || patch.question === "Valid question?",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
             typeof patch === "object" &&
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
