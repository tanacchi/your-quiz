# Mutant d69199a0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3020
**Stable ID**: d69199a0
**Location**: L207:29–L207:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3020
@@ -203,9 +203,9 @@
       it.each([
         ["exactly 1000 chars", "A".repeat(1000), true],
         ["1001 chars", "A".repeat(1001), false],
         ["empty string", "", true],
-        ["only whitespace", "   ", true],
+        ["only whitespace", "", true],
       ])(
         "should validate explanation length: %s -> %s",
         (_desc, explanation, isValid) => {
           const data = { ...validQuizData, explanation };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
