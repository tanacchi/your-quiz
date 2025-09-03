# Mutant a177a98e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: UnaryOperator
**Original ID**: 462
**Stable ID**: a177a98e
**Location**: L293:52–L293:54

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #462
@@ -289,9 +289,9 @@
         ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
         ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
         ["invalid offset string", { offset: "xyz" }, NaN, false],
-        ["negative limit string", { limit: "-5" }, -5, false],
+        ["negative limit string", { limit: "-5" }, +5, false],
         ["negative offset string", { offset: "-1" }, -1, false],
       ])(
         "should handle numeric coercion: %s",
         (_desc, input, expected, isValid) => {
```

## Hint

単項演算子が変更されています（例: !condition → condition）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
