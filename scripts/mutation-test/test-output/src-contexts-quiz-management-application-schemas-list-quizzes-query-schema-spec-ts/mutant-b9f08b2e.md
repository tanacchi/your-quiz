# Mutant b9f08b2e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 429
**Stable ID**: b9f08b2e
**Location**: L287:10–L287:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #429
@@ -283,9 +283,9 @@
         }
       });
 
       it.each([
-        ["valid limit string", { limit: "50" }, 50, true],
+        ["", { limit: "50" }, 50, true],
         ["valid offset string", { offset: "25" }, 25, true],
         ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
         ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
         ["invalid limit string", { limit: "abc" }, NaN, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
