# Mutant df54c6f8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 93
**Stable ID**: df54c6f8
**Location**: L97:11–L99:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #93
@@ -93,11 +93,9 @@
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
-      ...(data.min_correct_answers != null && {
-        min_correct_answers: data.min_correct_answers,
-      }),
+      ...(false),
     };
 
     return result;
   });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。