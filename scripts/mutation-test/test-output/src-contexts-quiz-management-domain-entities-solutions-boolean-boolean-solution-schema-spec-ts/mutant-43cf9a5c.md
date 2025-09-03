# Mutant 43cf9a5c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5979
**Stable ID**: 43cf9a5c
**Location**: L220:44–L220:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5979
@@ -216,9 +216,9 @@
       const quizSolutions = [
         { id: "solution-correct-answer", value: true },
         { id: "solution-incorrect-answer", value: false },
         { id: "solution-yes-no-yes", value: true },
-        { id: "solution-yes-no-no", value: false },
+        { id: "solution-yes-no-no", value: true },
         { id: "solution-true-false-true", value: true },
         { id: "solution-true-false-false", value: false },
       ];
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
