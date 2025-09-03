# Mutant 4fb1c44b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 194
**Stable ID**: 4fb1c44b
**Location**: L108:32–L108:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #194
@@ -104,9 +104,9 @@
       it.each([
         ["valid single quizId", ["quiz-123"], true],
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
-        ["valid alphanumeric", ["q1"], true],
+        ["valid alphanumeric", [], true],
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
         ["mixed valid and empty", ["quiz-1", ""], false],
         ["empty array", [], true],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
