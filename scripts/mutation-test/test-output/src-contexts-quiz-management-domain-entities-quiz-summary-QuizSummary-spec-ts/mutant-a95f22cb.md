# Mutant a95f22cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3800
**Stable ID**: a95f22cb
**Location**: L537:25–L537:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3800
@@ -533,9 +533,9 @@
     describe("Field operations", () => {
       it.each([
         ["question", "Draft question"],
         ["answerType", "single_choice"],
-        ["explanation", "Draft explanation"],
+        ["explanation", ""],
         ["creatorId", "draft-creator"],
         ["solutionId", "draft-solution"],
       ])("should set and get %s field", (field, value) => {
         draft.update(field as keyof typeof validQuizData, value);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
