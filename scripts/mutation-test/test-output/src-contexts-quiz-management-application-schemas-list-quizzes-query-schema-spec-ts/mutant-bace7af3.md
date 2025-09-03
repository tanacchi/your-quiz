# Mutant bace7af3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 444
**Stable ID**: bace7af3
**Location**: L290:10–L290:33

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #444
@@ -286,9 +286,9 @@
       it.each([
         ["valid limit string", { limit: "50" }, 50, true],
         ["valid offset string", { offset: "25" }, 25, true],
         ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
-        ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
+        ["", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
         ["invalid offset string", { offset: "xyz" }, NaN, false],
         ["negative limit string", { limit: "-5" }, -5, false],
         ["negative offset string", { offset: "-1" }, -1, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
