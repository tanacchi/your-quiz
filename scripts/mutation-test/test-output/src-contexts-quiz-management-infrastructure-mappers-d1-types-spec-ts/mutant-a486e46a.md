# Mutant a486e46a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7569
**Stable ID**: a486e46a
**Location**: L189:20–L189:39

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7569
@@ -185,9 +185,9 @@
           boolean_value: true,
           correct_answer: "test",
           matching_strategy: "exact",
           case_sensitive: false,
-          choices: '{"test": "value"}',
+          choices: "",
           min_correct_answers: 2,
         };
 
         expectValidParse(zodQuizRowSchema, rowWithOptionals);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
