# Mutant c937e02b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4233
**Stable ID**: c937e02b
**Location**: L155:10–L155:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4233
@@ -151,9 +151,9 @@
         ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
         ["bool typo", "bool", [{ answerType: "boolean" }]],
         ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
         ["free typo", "free", [{ answerType: "free_text" }]],
-        ["text typo", "text", [{ answerType: "free_text" }]],
+        ["", "text", [{ answerType: "free_text" }]],
         [
           "answerType contains free",
           "free_form",
           [{ answerType: "free_text" }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
