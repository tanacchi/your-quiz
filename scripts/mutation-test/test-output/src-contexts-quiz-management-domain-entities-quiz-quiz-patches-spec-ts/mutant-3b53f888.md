# Mutant 3b53f888 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2481
**Stable ID**: 3b53f888
**Location**: L788:11–L790:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2481
@@ -784,11 +784,9 @@
 
       expect(result.length).toBeGreaterThan(0);
       const hasQuestionPatch = result.some(
         (patch) =>
-          typeof patch === "object" &&
-          "question" in patch &&
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
