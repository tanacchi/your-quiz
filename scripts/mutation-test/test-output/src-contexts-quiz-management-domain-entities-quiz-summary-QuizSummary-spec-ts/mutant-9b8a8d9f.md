# Mutant 9b8a8d9f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3908
**Stable ID**: 9b8a8d9f
**Location**: L635:24–L635:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3908
@@ -631,9 +631,9 @@
         ["existing field", "question", ""],
         ["non-existent field", "nonexistent", ""],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
         if (field === "question") {
-          draft.update("question", invalidValue);
+          draft.update("", invalidValue);
         }
 
         const fieldErrors = draft.getErrors(field);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
