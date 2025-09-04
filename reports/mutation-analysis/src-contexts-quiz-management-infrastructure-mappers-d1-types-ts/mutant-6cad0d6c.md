# Mutant 6cad0d6c Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: EqualityOperator
**Original ID**: 90
**Stable ID**: 6cad0d6c
**Location**: L96:11–L96:31

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #90
@@ -92,9 +92,9 @@
       }),
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
-      ...(data.choices != null && { choices: data.choices }),
+      ...(data.choices == null && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
     };
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。