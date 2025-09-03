# Mutant a9018af1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4541
**Stable ID**: a9018af1
**Location**: L441:13–L443:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4541
@@ -437,11 +437,9 @@
 
         // Check for specific patches
         const hasIdPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
-            "id" in patch &&
-            patch.id === "quiz-123",
+            true,
         );
         const hasQuestionPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
