# Mutant bac434d0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 435
**Stable ID**: bac434d0
**Location**: L288:33–L288:49

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #435
@@ -284,9 +284,9 @@
       });
 
       it.each([
         ["valid limit string", { limit: "50" }, 50, true],
-        ["valid offset string", { offset: "25" }, 25, true],
+        ["valid offset string", {}, 25, true],
         ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
         ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
         ["invalid offset string", { offset: "xyz" }, NaN, false],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
