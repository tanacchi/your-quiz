# Mutant a693dca5 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 150
**Stable ID**: a693dca5
**Location**: L89:42–L89:55

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #150
@@ -85,9 +85,9 @@
         ["valid UUID format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid alphanumeric", "user123", true],
         ["empty string", "", false],
         ["whitespace only", "   ", true], // whitespace-only strings are valid (length > 0)
-        ["array value (should reject)", ["creator-123"], false],
+        ["array value (should reject)", [""], false],
         ["null value", null, false],
         ["undefined value", undefined, true],
       ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
         const input = creatorId === undefined ? {} : { creatorId };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
