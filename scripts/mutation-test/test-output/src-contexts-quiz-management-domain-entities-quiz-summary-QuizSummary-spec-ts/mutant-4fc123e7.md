# Mutant 4fc123e7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3888
**Stable ID**: 4fc123e7
**Location**: L623:22–L623:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3888
@@ -619,9 +619,9 @@
     });
 
     describe("Error management", () => {
       it("should clear errors manually", () => {
-        draft.update("question", ""); // creates error
+        draft.update("", ""); // creates error
         expect(draft.hasErrors()).toBe(true);
 
         draft.clearErrors();
         expect(draft.hasErrors()).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
