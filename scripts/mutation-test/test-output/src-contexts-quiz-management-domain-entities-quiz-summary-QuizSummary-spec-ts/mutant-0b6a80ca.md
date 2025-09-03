# Mutant 0b6a80ca Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3328
**Stable ID**: 0b6a80ca
**Location**: L47:10–L47:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3328
@@ -43,9 +43,9 @@
     });
 
     describe("TagId validation", () => {
       it.each([
-        ["valid alphanumeric", "tag-1", true],
+        ["", "tag-1", true],
         ["valid with numbers", "tag123", true],
         ["valid with underscore", "tag_test", true],
         ["valid with dash", "tag-test", true],
         ["valid single char", "t", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
