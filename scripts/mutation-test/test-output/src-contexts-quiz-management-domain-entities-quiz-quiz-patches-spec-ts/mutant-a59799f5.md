# Mutant a59799f5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2237
**Stable ID**: a59799f5
**Location**: L538:13–L540:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2237
@@ -534,11 +534,9 @@
 
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
