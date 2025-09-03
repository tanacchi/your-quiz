# Mutant ec0b7886 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2239
**Stable ID**: ec0b7886
**Location**: L538:13–L540:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2239
@@ -534,11 +534,9 @@
 
         // Check for specific patches
         const hasIdPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "id" in patch &&
-            patch.id === "quiz-123",
+            typeof patch === "object" && "id" in patch || patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
