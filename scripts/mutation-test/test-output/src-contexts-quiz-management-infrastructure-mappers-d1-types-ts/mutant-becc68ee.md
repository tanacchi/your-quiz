# Mutant becc68ee Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: LogicalOperator
**Original ID**: 7859
**Stable ID**: becc68ee
**Location**: L93:11–L95:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7859
@@ -89,11 +89,11 @@
       }),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
-      ...(data.case_sensitive != null && {
-        case_sensitive: data.case_sensitive,
-      }),
+      ...(data.case_sensitive != null || {
+  case_sensitive: data.case_sensitive
+}),
       ...(data.choices != null && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
