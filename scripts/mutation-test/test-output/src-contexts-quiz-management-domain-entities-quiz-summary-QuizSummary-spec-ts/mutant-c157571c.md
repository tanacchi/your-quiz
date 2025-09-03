# Mutant c157571c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3892
**Stable ID**: c157571c
**Location**: L630:15–L633:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3892
@@ -626,12 +626,9 @@
         draft.clearErrors();
         expect(draft.hasErrors()).toBe(false);
       });
 
-      it.each([
-        ["existing field", "question", ""],
-        ["non-existent field", "nonexistent", ""],
-      ])("should get errors for %s", (_desc, field, invalidValue) => {
+      it.each([])("should get errors for %s", (_desc, field, invalidValue) => {
         if (field === "question") {
           draft.update("question", invalidValue);
         }
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
