# Mutant 90ae26fc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3803
**Stable ID**: 90ae26fc
**Location**: L538:23–L538:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3803
@@ -534,9 +534,9 @@
       it.each([
         ["question", "Draft question"],
         ["answerType", "single_choice"],
         ["explanation", "Draft explanation"],
-        ["creatorId", "draft-creator"],
+        ["creatorId", ""],
         ["solutionId", "draft-solution"],
       ])("should set and get %s field", (field, value) => {
         draft.update(field as keyof typeof validQuizData, value);
         expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
