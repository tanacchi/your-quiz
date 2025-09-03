# Mutant 003ceea7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 7862
**Stable ID**: 003ceea7
**Location**: L93:42–L95:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7862
@@ -89,11 +89,9 @@
       }),
       ...(data.matching_strategy != null && {
         matching_strategy: data.matching_strategy,
       }),
-      ...(data.case_sensitive != null && {
-        case_sensitive: data.case_sensitive,
-      }),
+      ...(data.case_sensitive != null && {}),
       ...(data.choices != null && { choices: data.choices }),
       ...(data.min_correct_answers != null && {
         min_correct_answers: data.min_correct_answers,
       }),
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
