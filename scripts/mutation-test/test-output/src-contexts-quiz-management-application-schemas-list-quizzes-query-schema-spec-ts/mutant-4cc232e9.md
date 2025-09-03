# Mutant 4cc232e9 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 128
**Stable ID**: 4cc232e9
**Location**: L84:10–L84:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #128
@@ -80,9 +80,9 @@
     });
 
     describe("CreatorId Field Validation", () => {
       it.each([
-        ["valid single creatorId", "creator-123", true],
+        ["", "creator-123", true],
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid alphanumeric", "user123", true],
         ["empty string", "", false],
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
