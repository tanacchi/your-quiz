# Mutant a080f1ea Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4938
**Stable ID**: a080f1ea
**Location**: L32:10–L32:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4938
@@ -28,9 +28,9 @@
     describe("QuizId", () => {
       it.each([
         ["valid alphanumeric", "quiz-123", true],
         ["valid with underscore", "quiz_test", true],
-        ["valid single char", "q", true],
+        ["", "q", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
