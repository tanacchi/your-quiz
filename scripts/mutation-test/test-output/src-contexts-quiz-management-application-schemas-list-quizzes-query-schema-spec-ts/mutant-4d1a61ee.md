# Mutant 4d1a61ee Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 176
**Stable ID**: 4d1a61ee
**Location**: L105:10–L105:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #176
@@ -101,9 +101,9 @@
     });
 
     describe("QuizId Field Validation", () => {
       it.each([
-        ["valid single quizId", ["quiz-123"], true],
+        ["", ["quiz-123"], true],
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
