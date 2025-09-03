# Mutant 42a1c48b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4544
**Stable ID**: 42a1c48b
**Location**: L441:13–L442:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4544
@@ -437,10 +437,9 @@
 
         // Check for specific patches
         const hasIdPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "id" in patch &&
+            true &&
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
           (patch) =>
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
