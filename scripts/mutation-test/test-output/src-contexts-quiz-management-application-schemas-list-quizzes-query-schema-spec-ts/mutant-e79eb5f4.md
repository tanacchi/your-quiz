# Mutant e79eb5f4 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 182
**Stable ID**: e79eb5f4
**Location**: L106:36–L106:66

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #182
@@ -102,9 +102,9 @@
 
     describe("QuizId Field Validation", () => {
       it.each([
         ["valid single quizId", ["quiz-123"], true],
-        ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
+        ["valid multiple quizIds", [], true],
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
