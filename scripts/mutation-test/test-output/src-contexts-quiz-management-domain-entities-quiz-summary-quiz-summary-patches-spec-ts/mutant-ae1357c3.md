# Mutant ae1357c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4227
**Stable ID**: ae1357c3
**Location**: L154:10–L154:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4227
@@ -150,9 +150,9 @@
         ["single typo", "single", [{ answerType: "single_choice" }]],
         ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
         ["bool typo", "bool", [{ answerType: "boolean" }]],
         ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
-        ["free typo", "free", [{ answerType: "free_text" }]],
+        ["", "free", [{ answerType: "free_text" }]],
         ["text typo", "text", [{ answerType: "free_text" }]],
         [
           "answerType contains free",
           "free_form",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
