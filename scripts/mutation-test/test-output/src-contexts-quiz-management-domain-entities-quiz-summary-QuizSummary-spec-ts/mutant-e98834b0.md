# Mutant e98834b0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3336
**Stable ID**: e98834b0
**Location**: L49:10–L49:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3336
@@ -45,9 +45,9 @@
     describe("TagId validation", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
         ["valid with numbers", "tag123", true],
-        ["valid with underscore", "tag_test", true],
+        ["", "tag_test", true],
         ["valid with dash", "tag-test", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
