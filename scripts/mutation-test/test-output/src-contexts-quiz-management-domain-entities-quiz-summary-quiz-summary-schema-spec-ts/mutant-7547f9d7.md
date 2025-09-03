# Mutant 7547f9d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5176
**Stable ID**: 7547f9d7
**Location**: L168:10–L168:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5176
@@ -164,9 +164,9 @@
         ["single_choice", "single_choice", true],
         ["multiple_choice", "multiple_choice", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
       ])(
         "should validate answerType: %s -> %s",
         (_desc, answerType, isValid) => {
           const data = { ...validQuizSummaryData, answerType };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
