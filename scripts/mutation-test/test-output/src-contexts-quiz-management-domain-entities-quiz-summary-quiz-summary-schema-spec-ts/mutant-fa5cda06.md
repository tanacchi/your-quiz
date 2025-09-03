# Mutant fa5cda06 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4954
**Stable ID**: fa5cda06
**Location**: L36:10–L36:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4954
@@ -32,9 +32,9 @@
         ["valid single char", "q", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
