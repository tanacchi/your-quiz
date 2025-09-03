# Mutant 5880f85d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 2483
**Stable ID**: 5880f85d
**Location**: L788:11–L790:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2483
@@ -784,11 +784,9 @@
 
       expect(result.length).toBeGreaterThan(0);
       const hasQuestionPatch = result.some(
         (patch) =>
-          typeof patch === "object" &&
-          "question" in patch &&
-          patch.question === "untrimmed",
+          typeof patch === "object" && "question" in patch || patch.question === "untrimmed",
       );
       expect(hasQuestionPatch).toBe(true);
     });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
