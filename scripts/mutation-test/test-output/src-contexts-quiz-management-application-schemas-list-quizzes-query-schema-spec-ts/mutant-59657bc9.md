# Mutant 59657bc9 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 136
**Stable ID**: 59657bc9
**Location**: L86:10–L86:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #136
@@ -82,9 +82,9 @@
     describe("CreatorId Field Validation", () => {
       it.each([
         ["valid single creatorId", "creator-123", true],
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid alphanumeric", "user123", true],
+        ["", "user123", true],
         ["empty string", "", false],
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
         ["array value (should reject)", ["creator-123"], false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
