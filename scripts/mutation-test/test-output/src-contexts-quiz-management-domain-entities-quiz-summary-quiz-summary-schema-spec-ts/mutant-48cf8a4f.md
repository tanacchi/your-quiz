# Mutant 48cf8a4f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4946
**Stable ID**: 48cf8a4f
**Location**: L34:10–L34:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4946
@@ -30,9 +30,9 @@
         ["valid alphanumeric", "quiz-123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid single char", "q", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
