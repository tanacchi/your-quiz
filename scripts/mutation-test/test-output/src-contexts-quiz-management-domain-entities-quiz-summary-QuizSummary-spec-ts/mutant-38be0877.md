# Mutant 38be0877 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3808
**Stable ID**: 38be0877
**Location**: L540:59–L543:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3808
@@ -536,12 +536,9 @@
         ["answerType", "single_choice"],
         ["explanation", "Draft explanation"],
         ["creatorId", "draft-creator"],
         ["solutionId", "draft-solution"],
-      ])("should set and get %s field", (field, value) => {
-        draft.update(field as keyof typeof validQuizData, value);
-        expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
-      });
+      ])("should set and get %s field", (field, value) => {});
     });
 
     it("should set multiple values at once", () => {
       const updates = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
