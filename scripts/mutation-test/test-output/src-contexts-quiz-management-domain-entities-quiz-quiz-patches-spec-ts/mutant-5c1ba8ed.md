# Mutant 5c1ba8ed Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2255
**Stable ID**: 5c1ba8ed
**Location**: L544:13–L545:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2255
@@ -540,10 +540,9 @@
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
+            typeof patch === "object" || "question" in patch &&
             patch.question === "Sample boolean question?",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
