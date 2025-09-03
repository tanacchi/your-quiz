# Mutant 32ac25b7 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 204
**Stable ID**: 32ac25b7
**Location**: L110:29–L110:36

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #204
@@ -106,9 +106,9 @@
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
-        ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
+        ["whitespace only", [], true], // whitespace-only strings have length > 0
         ["mixed valid and empty", ["quiz-1", ""], false],
         ["empty array", [], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
