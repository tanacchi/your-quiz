# Mutant 1deb93db Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3301
**Stable ID**: 1deb93db
**Location**: L29:10–L29:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3301
@@ -25,9 +25,9 @@
         ["valid alphanumeric", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid with dash", "quiz-test", true],
-        ["valid single char", "q", true],
+        ["", "q", true],
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
