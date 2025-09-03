# Mutant fce44387 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4215
**Stable ID**: fce44387
**Location**: L152:10–L152:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4215
@@ -148,9 +148,9 @@
     describe("suggestAnswerTypePatches", () => {
       it.each([
         ["single typo", "single", [{ answerType: "single_choice" }]],
         ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
-        ["bool typo", "bool", [{ answerType: "boolean" }]],
+        ["", "bool", [{ answerType: "boolean" }]],
         ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
         ["free typo", "free", [{ answerType: "free_text" }]],
         ["text typo", "text", [{ answerType: "free_text" }]],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
