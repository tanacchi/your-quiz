# Mutant d0c24eaa Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3795
**Stable ID**: d0c24eaa
**Location**: L536:9–L536:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3795
@@ -532,9 +532,9 @@
 
     describe("Field operations", () => {
       it.each([
         ["question", "Draft question"],
-        ["answerType", "single_choice"],
+        [],
         ["explanation", "Draft explanation"],
         ["creatorId", "draft-creator"],
         ["solutionId", "draft-solution"],
       ])("should set and get %s field", (field, value) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
