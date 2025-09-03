# Mutant e2c50208 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 144
**Stable ID**: e2c50208
**Location**: L88:10–L88:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #144
@@ -84,9 +84,9 @@
         ["valid single creatorId", "creator-123", true],
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid alphanumeric", "user123", true],
         ["empty string", "", false],
-        ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
+        ["", "   ", true], // whitespace-only strings are valid (length > 0)
         ["array value (should reject)", ["creator-123"], false],
         ["null value", null, false],
         ["undefined value", undefined, true],
       ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
