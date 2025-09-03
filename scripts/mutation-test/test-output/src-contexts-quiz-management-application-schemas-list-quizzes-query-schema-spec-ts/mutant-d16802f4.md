# Mutant d16802f4 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 140
**Stable ID**: d16802f4
**Location**: L87:10–L87:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #140
@@ -83,9 +83,9 @@
       it.each([
         ["valid single creatorId", "creator-123", true],
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid alphanumeric", "user123", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
         ["array value (should reject)", ["creator-123"], false],
         ["null value", null, false],
         ["undefined value", undefined, true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
