# Mutant dc28068d Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 7872
**Stable ID**: dc28068d
**Location**: L97:11–L97:43

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7872
@@ -93,9 +93,9 @@
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
-      ...(data.min_correct_answers != null && {
+      ...(true && {
         min_correct_answers: data.min_correct_answers,
       }),
     };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
