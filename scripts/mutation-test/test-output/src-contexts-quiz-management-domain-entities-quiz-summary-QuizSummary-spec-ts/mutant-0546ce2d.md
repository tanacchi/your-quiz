# Mutant 0546ce2d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3886
**Stable ID**: 0546ce2d
**Location**: L622:10–L622:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3886
@@ -618,9 +618,9 @@
       });
     });
 
     describe("Error management", () => {
-      it("should clear errors manually", () => {
+      it("", () => {
         draft.update("question", ""); // creates error
         expect(draft.hasErrors()).toBe(true);
 
         draft.clearErrors();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
