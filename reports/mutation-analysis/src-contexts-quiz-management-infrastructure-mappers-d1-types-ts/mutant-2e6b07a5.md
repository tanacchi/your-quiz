# Mutant 2e6b07a5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ConditionalExpression
**Original ID**: 125
**Stable ID**: 2e6b07a5
**Location**: L86:11–L88:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #125
@@ -82,11 +82,9 @@
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
-      ...(data.min_correct_answers != null && {
-        min_correct_answers: data.min_correct_answers,
-      }),
+      ...(true),
     };
 
     return result;
   });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。