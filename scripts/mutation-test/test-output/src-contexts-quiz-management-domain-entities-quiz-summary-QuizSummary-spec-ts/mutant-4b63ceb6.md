# Mutant 4b63ceb6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3792
**Stable ID**: 4b63ceb6
**Location**: L535:9–L535:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3792
@@ -531,9 +531,9 @@
     });
 
     describe("Field operations", () => {
       it.each([
-        ["question", "Draft question"],
+        [],
         ["answerType", "single_choice"],
         ["explanation", "Draft explanation"],
         ["creatorId", "draft-creator"],
         ["solutionId", "draft-solution"],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
