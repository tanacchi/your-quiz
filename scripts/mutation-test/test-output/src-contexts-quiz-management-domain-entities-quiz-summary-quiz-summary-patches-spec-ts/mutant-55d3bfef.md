# Mutant 55d3bfef Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4209
**Stable ID**: 55d3bfef
**Location**: L151:10–L151:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4209
@@ -147,9 +147,9 @@
 
     describe("suggestAnswerTypePatches", () => {
       it.each([
         ["single typo", "single", [{ answerType: "single_choice" }]],
-        ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
+        ["", "multiple", [{ answerType: "multiple_choice" }]],
         ["bool typo", "bool", [{ answerType: "boolean" }]],
         ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
         ["free typo", "free", [{ answerType: "free_text" }]],
         ["text typo", "text", [{ answerType: "free_text" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
