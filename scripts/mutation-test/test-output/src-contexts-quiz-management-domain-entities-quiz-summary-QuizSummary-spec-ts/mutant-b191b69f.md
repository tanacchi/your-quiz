# Mutant b191b69f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3801
**Stable ID**: b191b69f
**Location**: L538:9–L538:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3801
@@ -534,9 +534,9 @@
       it.each([
         ["question", "Draft question"],
         ["answerType", "single_choice"],
         ["explanation", "Draft explanation"],
-        ["creatorId", "draft-creator"],
+        [],
         ["solutionId", "draft-solution"],
       ])("should set and get %s field", (field, value) => {
         draft.update(field as keyof typeof validQuizData, value);
         expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
