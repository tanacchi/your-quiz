# Mutant b0afa776 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3880
**Stable ID**: b0afa776
**Location**: L607:10–L607:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3880
@@ -603,9 +603,9 @@
         ["empty question", { question: "" }],
         ["invalid answerType", { answerType: "invalid" }],
         ["missing creatorId", { creatorId: undefined }],
         ["missing solutionId", { solutionId: undefined }],
-      ])("should fail to commit with %s", (_desc, invalidData) => {
+      ])("", (_desc, invalidData) => {
         draft.with({
           ...(validQuizData as Record<string, unknown>),
           ...invalidData,
         } as Parameters<typeof draft.with>[0]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
