# Mutant 8b0c5d8d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3895
**Stable ID**: 8b0c5d8d
**Location**: L631:28–L631:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3895
@@ -627,9 +627,9 @@
         expect(draft.hasErrors()).toBe(false);
       });
 
       it.each([
-        ["existing field", "question", ""],
+        ["existing field", "", ""],
         ["non-existent field", "nonexistent", ""],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
         if (field === "question") {
           draft.update("question", invalidValue);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
