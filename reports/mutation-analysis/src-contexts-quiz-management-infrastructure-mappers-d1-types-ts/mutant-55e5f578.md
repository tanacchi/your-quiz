# Mutant 55e5f578 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 760
**Stable ID**: 55e5f578
**Location**: L97:47–L99:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #760
@@ -93,11 +93,9 @@
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
       ...(data.choices != null && { choices: data.choices }),
-      ...(data.min_correct_answers != null && {
-        min_correct_answers: data.min_correct_answers,
-      }),
+      ...(data.min_correct_answers != null && {}),
     };
 
     return result;
   });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。