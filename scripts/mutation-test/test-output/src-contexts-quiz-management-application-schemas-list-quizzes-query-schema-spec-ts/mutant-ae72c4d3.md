# Mutant ae72c4d3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 465
**Stable ID**: ae72c4d3
**Location**: L294:10–L294:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #465
@@ -290,9 +290,9 @@
         ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
         ["invalid offset string", { offset: "xyz" }, NaN, false],
         ["negative limit string", { limit: "-5" }, -5, false],
-        ["negative offset string", { offset: "-1" }, -1, false],
+        ["", { offset: "-1" }, -1, false],
       ])(
         "should handle numeric coercion: %s",
         (_desc, input, expected, isValid) => {
           const result = listQueryFromReq.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
