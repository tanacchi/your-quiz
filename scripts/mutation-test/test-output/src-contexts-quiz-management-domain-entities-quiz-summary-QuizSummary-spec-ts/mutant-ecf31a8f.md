# Mutant ecf31a8f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3900
**Stable ID**: ecf31a8f
**Location**: L632:47–L632:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3900
@@ -628,9 +628,9 @@
       });
 
       it.each([
         ["existing field", "question", ""],
-        ["non-existent field", "nonexistent", ""],
+        ["non-existent field", "nonexistent", "Stryker was here!"],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
         if (field === "question") {
           draft.update("question", invalidValue);
         }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
