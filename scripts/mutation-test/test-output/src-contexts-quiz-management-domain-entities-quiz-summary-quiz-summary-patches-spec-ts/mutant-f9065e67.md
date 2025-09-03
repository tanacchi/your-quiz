# Mutant f9065e67 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 4559
**Stable ID**: f9065e67
**Location**: L447:13–L448:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4559
@@ -443,10 +443,9 @@
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
+            typeof patch === "object" || "question" in patch &&
             patch.question === "Sample question",
         );
         const hasAnswerTypePatch = result.some(
           (patch) =>
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
