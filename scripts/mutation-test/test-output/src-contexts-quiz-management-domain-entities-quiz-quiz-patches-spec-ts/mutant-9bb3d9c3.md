# Mutant 9bb3d9c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2490
**Stable ID**: 9bb3d9c3
**Location**: L790:11–L790:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2490
@@ -786,9 +786,9 @@
       const hasQuestionPatch = result.some(
         (patch) =>
           typeof patch === "object" &&
           "question" in patch &&
-          patch.question === "untrimmed",
+          true,
       );
       expect(hasQuestionPatch).toBe(true);
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
