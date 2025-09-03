# Mutant 9fd537d3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4221
**Stable ID**: 9fd537d3
**Location**: L153:10–L153:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4221
@@ -149,9 +149,9 @@
       it.each([
         ["single typo", "single", [{ answerType: "single_choice" }]],
         ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
         ["bool typo", "bool", [{ answerType: "boolean" }]],
-        ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
+        ["", "boolean_choice", [{ answerType: "boolean" }]],
         ["free typo", "free", [{ answerType: "free_text" }]],
         ["text typo", "text", [{ answerType: "free_text" }]],
         [
           "answerType contains free",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
