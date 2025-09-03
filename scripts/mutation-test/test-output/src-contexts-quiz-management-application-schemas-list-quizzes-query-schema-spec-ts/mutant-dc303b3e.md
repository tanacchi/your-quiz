# Mutant dc303b3e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 177
**Stable ID**: dc303b3e
**Location**: L105:33–L105:45

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #177
@@ -101,9 +101,9 @@
     });
 
     describe("QuizId Field Validation", () => {
       it.each([
-        ["valid single quizId", ["quiz-123"], true],
+        ["valid single quizId", [], true],
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
