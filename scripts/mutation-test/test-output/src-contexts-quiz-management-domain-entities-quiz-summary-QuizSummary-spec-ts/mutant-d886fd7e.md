# Mutant d886fd7e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3889
**Stable ID**: d886fd7e
**Location**: L623:34–L623:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3889
@@ -619,9 +619,9 @@
     });
 
     describe("Error management", () => {
       it("should clear errors manually", () => {
-        draft.update("question", ""); // creates error
+        draft.update("question", "Stryker was here!"); // creates error
         expect(draft.hasErrors()).toBe(true);
 
         draft.clearErrors();
         expect(draft.hasErrors()).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
