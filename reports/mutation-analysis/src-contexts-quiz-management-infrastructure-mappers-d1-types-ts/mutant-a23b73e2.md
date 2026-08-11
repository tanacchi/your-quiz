# Mutant a23b73e2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: LogicalOperator
**Original ID**: 127
**Stable ID**: a23b73e2
**Location**: L86:11–L88:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #127
@@ -82,11 +82,11 @@
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
-      ...(data.min_correct_answers != null && {
-        min_correct_answers: data.min_correct_answers,
-      }),
+      ...(data.min_correct_answers != null || {
+  min_correct_answers: data.min_correct_answers
+}),
     };
 
     return result;
   });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。