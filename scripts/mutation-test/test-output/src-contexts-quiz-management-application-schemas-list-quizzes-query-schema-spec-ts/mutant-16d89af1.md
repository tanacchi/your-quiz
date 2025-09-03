# Mutant 16d89af1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 188
**Stable ID**: 16d89af1
**Location**: L107:10–L107:29

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #188
@@ -103,9 +103,9 @@
     describe("QuizId Field Validation", () => {
       it.each([
         ["valid single quizId", ["quiz-123"], true],
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
-        ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
+        ["", ["550e8400-e29b-41d4-a716-446655440000"], true],
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
         ["mixed valid and empty", ["quiz-1", ""], false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
