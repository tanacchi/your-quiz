# Mutant 2041c1f8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 87
**Stable ID**: 2041c1f8
**Location**: L96:11–L96:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #87
@@ -92,9 +92,9 @@
       }),
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
-      ...(data.choices != null && { choices: data.choices }),
+      ...(false),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
     };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。