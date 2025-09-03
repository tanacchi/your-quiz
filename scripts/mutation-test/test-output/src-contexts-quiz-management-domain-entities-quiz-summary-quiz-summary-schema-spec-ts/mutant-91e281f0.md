# Mutant 91e281f0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4950
**Stable ID**: 91e281f0
**Location**: L35:10–L35:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4950
@@ -31,9 +31,9 @@
         ["valid with underscore", "quiz_test", true],
         ["valid single char", "q", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
-        ["only whitespace", "   ", true],
+        ["", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
