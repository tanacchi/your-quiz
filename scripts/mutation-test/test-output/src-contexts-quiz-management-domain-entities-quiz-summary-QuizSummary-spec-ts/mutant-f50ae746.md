# Mutant f50ae746 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3857
**Stable ID**: f50ae746
**Location**: L592:14–L592:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3857
@@ -588,9 +588,9 @@
         expect(draft.hasErrors()).toBe(false);
       });
     });
 
-    describe("Commit operations", () => {
+    describe("", () => {
       it("should commit to QuizSummary when valid", () => {
         draft.with(validQuizData as Record<string, unknown>);
 
         const result = draft.commit();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
