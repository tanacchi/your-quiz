# Mutant 42e76af3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3817
**Stable ID**: 42e76af3
**Location**: L560:14–L560:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3817
@@ -556,9 +556,9 @@
       expect(draft.get("answerType")).toBe("single_choice");
       expect(draft.get("explanation")).toBe("Draft explanation");
     });
 
-    describe("Validation error handling", () => {
+    describe("", () => {
       it.each([
         ["empty question", { question: "" }, "question"],
         ["invalid answerType", { answerType: "invalid" }, "answerType"],
         ["empty creatorId", { creatorId: "" }, "creatorId"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
