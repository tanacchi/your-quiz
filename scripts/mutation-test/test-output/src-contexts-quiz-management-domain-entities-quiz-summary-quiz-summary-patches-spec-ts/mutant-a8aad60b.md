# Mutant a8aad60b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4239
**Stable ID**: a8aad60b
**Location**: L157:11–L157:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4239
@@ -153,9 +153,9 @@
         ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
         ["free typo", "free", [{ answerType: "free_text" }]],
         ["text typo", "text", [{ answerType: "free_text" }]],
         [
-          "answerType contains free",
+          "",
           "free_form",
           [{ answerType: "free_text" }],
         ],
         ["unknown typo", "unknown_type", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
