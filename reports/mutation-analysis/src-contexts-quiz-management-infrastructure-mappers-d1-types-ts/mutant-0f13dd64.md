# Mutant 0f13dd64 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 91
**Stable ID**: 0f13dd64
**Location**: L96:35–L96:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #91
@@ -92,9 +92,9 @@
       }),
       ...(data.case_sensitive != null && {
         case_sensitive: data.case_sensitive,
       }),
-      ...(data.choices != null && { choices: data.choices }),
+      ...(data.choices != null && {}),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
     };
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。