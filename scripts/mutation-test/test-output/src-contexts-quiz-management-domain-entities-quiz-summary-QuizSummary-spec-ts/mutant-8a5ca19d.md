# Mutant 8a5ca19d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3297
**Stable ID**: 8a5ca19d
**Location**: L28:10–L28:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3297
@@ -24,9 +24,9 @@
       it.each([
         ["valid alphanumeric", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["valid with underscore", "quiz_test", true],
-        ["valid with dash", "quiz-test", true],
+        ["", "quiz-test", true],
         ["valid single char", "q", true],
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
