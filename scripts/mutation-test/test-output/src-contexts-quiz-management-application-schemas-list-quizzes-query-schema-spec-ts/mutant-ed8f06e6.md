# Mutant ed8f06e6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 210
**Stable ID**: ed8f06e6
**Location**: L111:36–L111:44

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #210
@@ -107,9 +107,9 @@
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
-        ["mixed valid and empty", ["quiz-1", ""], false],
+        ["mixed valid and empty", ["", ""], false],
         ["empty array", [], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
         ["undefined value", undefined, true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
