# Mutant b46ed638 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5172
**Stable ID**: b46ed638
**Location**: L167:10–L167:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5172
@@ -163,9 +163,9 @@
         ["free_text", "free_text", true],
         ["single_choice", "single_choice", true],
         ["multiple_choice", "multiple_choice", true],
         ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
       ])(
         "should validate answerType: %s -> %s",
         (_desc, answerType, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
