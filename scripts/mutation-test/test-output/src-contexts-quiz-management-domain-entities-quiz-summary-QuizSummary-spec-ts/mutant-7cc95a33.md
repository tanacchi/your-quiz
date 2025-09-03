# Mutant 7cc95a33 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3865
**Stable ID**: 7cc95a33
**Location**: L602:15–L607:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3865
@@ -598,14 +598,9 @@
         const quiz = result._unsafeUnwrap({ withStackTrace: true });
         expect(quiz.get("question")).toBe("What is TypeScript?");
       });
 
-      it.each([
-        ["empty question", { question: "" }],
-        ["invalid answerType", { answerType: "invalid" }],
-        ["missing creatorId", { creatorId: undefined }],
-        ["missing solutionId", { solutionId: undefined }],
-      ])("should fail to commit with %s", (_desc, invalidData) => {
+      it.each([])("should fail to commit with %s", (_desc, invalidData) => {
         draft.with({
           ...(validQuizData as Record<string, unknown>),
           ...invalidData,
         } as Parameters<typeof draft.with>[0]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
