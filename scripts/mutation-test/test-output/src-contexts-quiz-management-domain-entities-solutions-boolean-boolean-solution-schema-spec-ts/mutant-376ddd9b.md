# Mutant 376ddd9b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5985
**Stable ID**: 376ddd9b
**Location**: L222:51–L222:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5985
@@ -218,9 +218,9 @@
         { id: "solution-incorrect-answer", value: false },
         { id: "solution-yes-no-yes", value: true },
         { id: "solution-yes-no-no", value: false },
         { id: "solution-true-false-true", value: true },
-        { id: "solution-true-false-false", value: false },
+        { id: "solution-true-false-false", value: true },
       ];
 
       quizSolutions.forEach((solution, _index) => {
         const result = BooleanSolutionSchema.safeParse(solution);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
