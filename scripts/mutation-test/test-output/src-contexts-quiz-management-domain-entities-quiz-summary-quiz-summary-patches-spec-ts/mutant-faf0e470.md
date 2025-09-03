# Mutant faf0e470 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4546
**Stable ID**: faf0e470
**Location**: L441:13–L441:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4546
@@ -437,9 +437,9 @@
 
         // Check for specific patches
         const hasIdPatch = result.some(
           (patch) =>
-            typeof patch === "object" &&
+            true &&
             "id" in patch &&
             patch.id === "quiz-123",
         );
         const hasQuestionPatch = result.some(
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
