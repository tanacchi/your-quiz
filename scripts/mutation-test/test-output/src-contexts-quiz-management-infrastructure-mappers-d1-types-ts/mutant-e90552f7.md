# Mutant e90552f7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: LogicalOperator
**Original ID**: 7865
**Stable ID**: e90552f7
**Location**: L96:11–L96:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7865
@@ -92,9 +92,11 @@
       }),
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
-      ...(data.choices != null && { choices: data.choices }),
+      ...(data.choices != null || {
+  choices: data.choices
+}),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
     };
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
