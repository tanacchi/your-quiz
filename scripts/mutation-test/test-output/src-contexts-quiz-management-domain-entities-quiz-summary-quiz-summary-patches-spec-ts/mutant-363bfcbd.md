# Mutant 363bfcbd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4604
**Stable ID**: 363bfcbd
**Location**: L481:24–L481:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4604
@@ -477,9 +477,9 @@
             { path: ["id"], code: "invalid", message: "Invalid id" },
             {
               path: ["question"],
               code: "invalid",
-              message: "Invalid question",
+              message: "",
             },
             {
               path: ["answerType"],
               code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
