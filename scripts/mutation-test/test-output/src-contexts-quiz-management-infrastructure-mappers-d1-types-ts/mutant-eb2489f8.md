# Mutant eb2489f8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 7866
**Stable ID**: eb2489f8
**Location**: L96:11–L96:31

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7866
@@ -92,9 +92,9 @@
       }),
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
-      ...(data.choices != null && { choices: data.choices }),
+      ...(true && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
     };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
