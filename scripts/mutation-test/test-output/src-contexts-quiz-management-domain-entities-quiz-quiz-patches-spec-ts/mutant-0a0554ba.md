# Mutant 0a0554ba Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2166
**Stable ID**: 0a0554ba
**Location**: L483:13–L484:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2166
@@ -479,10 +479,9 @@
         expect(result.length).toBeGreaterThanOrEqual(2);
 
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
+            typeof patch === "object" || "question" in patch &&
             patch.question === "Valid question?",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
