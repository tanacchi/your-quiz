# Mutant 65fd653a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2486
**Stable ID**: 65fd653a
**Location**: L788:11–L788:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2486
@@ -784,9 +784,9 @@
 
       expect(result.length).toBeGreaterThan(0);
       const hasQuestionPatch = result.some(
         (patch) =>
-          typeof patch === "object" &&
+          true &&
           "question" in patch &&
           patch.question === "untrimmed",
       );
       expect(hasQuestionPatch).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
