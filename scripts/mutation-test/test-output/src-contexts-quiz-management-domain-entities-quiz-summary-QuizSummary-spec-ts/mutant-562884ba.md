# Mutant 562884ba Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3819
**Stable ID**: 562884ba
**Location**: L561:15–L567:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3819
@@ -557,15 +557,9 @@
       expect(draft.get("explanation")).toBe("Draft explanation");
     });
 
     describe("Validation error handling", () => {
-      it.each([
-        ["empty question", { question: "" }, "question"],
-        ["invalid answerType", { answerType: "invalid" }, "answerType"],
-        ["empty creatorId", { creatorId: "" }, "creatorId"],
-        ["empty solutionId", { solutionId: "" }, "solutionId"],
-        ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
-      ])(
+      it.each([])(
         "should validate and store errors for %s",
         (_desc, invalidData, errorField) => {
           Object.entries(invalidData).forEach(([key, value]) => {
             draft.update(key as keyof typeof validQuizData, value);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
