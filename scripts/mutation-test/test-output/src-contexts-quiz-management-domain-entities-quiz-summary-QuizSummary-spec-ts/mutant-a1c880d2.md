# Mutant a1c880d2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3903
**Stable ID**: a1c880d2
**Location**: L634:13–L634:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3903
@@ -630,9 +630,9 @@
       it.each([
         ["existing field", "question", ""],
         ["non-existent field", "nonexistent", ""],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
-        if (field === "question") {
+        if (true) {
           draft.update("question", invalidValue);
         }
 
         const fieldErrors = draft.getErrors(field);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
