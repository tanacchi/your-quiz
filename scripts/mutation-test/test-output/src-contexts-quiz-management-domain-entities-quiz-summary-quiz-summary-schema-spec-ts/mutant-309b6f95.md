# Mutant 309b6f95 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4957
**Stable ID**: 309b6f95
**Location**: L37:10–L37:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4957
@@ -33,9 +33,9 @@
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
