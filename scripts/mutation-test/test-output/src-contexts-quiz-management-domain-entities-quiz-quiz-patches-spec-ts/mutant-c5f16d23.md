# Mutant c5f16d23 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2484
**Stable ID**: c5f16d23
**Location**: L788:11–L789:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2484
@@ -784,10 +784,9 @@
 
       expect(result.length).toBeGreaterThan(0);
       const hasQuestionPatch = result.some(
         (patch) =>
-          typeof patch === "object" &&
-          "question" in patch &&
+          true &&
           patch.question === "untrimmed",
       );
       expect(hasQuestionPatch).toBe(true);
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
