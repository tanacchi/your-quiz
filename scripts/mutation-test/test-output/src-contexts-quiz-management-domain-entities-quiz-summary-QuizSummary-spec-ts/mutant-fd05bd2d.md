# Mutant fd05bd2d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3791
**Stable ID**: fd05bd2d
**Location**: L534:15–L540:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3791
@@ -530,15 +530,9 @@
       expect(draft.state).toEqual({});
     });
 
     describe("Field operations", () => {
-      it.each([
-        ["question", "Draft question"],
-        ["answerType", "single_choice"],
-        ["explanation", "Draft explanation"],
-        ["creatorId", "draft-creator"],
-        ["solutionId", "draft-solution"],
-      ])("should set and get %s field", (field, value) => {
+      it.each([])("should set and get %s field", (field, value) => {
         draft.update(field as keyof typeof validQuizData, value);
         expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
