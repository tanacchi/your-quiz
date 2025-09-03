# Mutant 673f7dc7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3806
**Stable ID**: 673f7dc7
**Location**: L539:24–L539:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3806
@@ -535,9 +535,9 @@
         ["question", "Draft question"],
         ["answerType", "single_choice"],
         ["explanation", "Draft explanation"],
         ["creatorId", "draft-creator"],
-        ["solutionId", "draft-solution"],
+        ["solutionId", ""],
       ])("should set and get %s field", (field, value) => {
         draft.update(field as keyof typeof validQuizData, value);
         expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
