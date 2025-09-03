# Mutant 031f7b12 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 461
**Stable ID**: 031f7b12
**Location**: L293:44–L293:48

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #461
@@ -289,9 +289,9 @@
         ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
         ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
         ["invalid offset string", { offset: "xyz" }, NaN, false],
-        ["negative limit string", { limit: "-5" }, -5, false],
+        ["negative limit string", { limit: "" }, -5, false],
         ["negative offset string", { offset: "-1" }, -1, false],
       ])(
         "should handle numeric coercion: %s",
         (_desc, input, expected, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
