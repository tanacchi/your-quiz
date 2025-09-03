# Mutant 7b833adf Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 132
**Stable ID**: 7b833adf
**Location**: L85:10–L85:29

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #132
@@ -81,9 +81,9 @@
 
     describe("CreatorId Field Validation", () => {
       it.each([
         ["valid single creatorId", "creator-123", true],
-        ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid alphanumeric", "user123", true],
         ["empty string", "", false],
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
         ["array value (should reject)", ["creator-123"], false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
