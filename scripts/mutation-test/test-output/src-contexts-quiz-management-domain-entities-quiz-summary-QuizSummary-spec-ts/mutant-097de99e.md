# Mutant 097de99e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3332
**Stable ID**: 097de99e
**Location**: L48:10–L48:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3332
@@ -44,9 +44,9 @@
 
     describe("TagId validation", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
-        ["valid with numbers", "tag123", true],
+        ["", "tag123", true],
         ["valid with underscore", "tag_test", true],
         ["valid with dash", "tag-test", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
