# Mutant ac104deb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3348
**Stable ID**: ac104deb
**Location**: L52:10–L52:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3348
@@ -48,9 +48,9 @@
         ["valid with numbers", "tag123", true],
         ["valid with underscore", "tag_test", true],
         ["valid with dash", "tag-test", true],
         ["valid single char", "t", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
