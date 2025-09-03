# Mutant 65a2a29e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2246
**Stable ID**: 65a2a29e
**Location**: L540:13–L540:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2246
@@ -536,9 +536,9 @@
         const hasIdPatch = result.some(
           (patch) =>
             typeof patch === "object" &&
             "id" in patch &&
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
