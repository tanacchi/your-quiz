# Mutant d856f832 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 441
**Stable ID**: d856f832
**Location**: L289:43–L289:49

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #441
@@ -285,9 +285,9 @@
 
       it.each([
         ["valid limit string", { limit: "50" }, 50, true],
         ["valid offset string", { offset: "25" }, 25, true],
-        ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
+        ["decimal limit string", { limit: "" }, 10.5, false], // coerces to number but fails int validation
         ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
         ["invalid offset string", { offset: "xyz" }, NaN, false],
         ["negative limit string", { limit: "-5" }, -5, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
