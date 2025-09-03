# Mutant 6c4e178a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4942
**Stable ID**: 6c4e178a
**Location**: L33:10–L33:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4942
@@ -29,9 +29,9 @@
       it.each([
         ["valid alphanumeric", "quiz-123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid single char", "q", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
