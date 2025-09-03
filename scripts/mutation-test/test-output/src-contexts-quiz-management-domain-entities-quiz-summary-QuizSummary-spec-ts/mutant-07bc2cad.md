# Mutant 07bc2cad Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3790
**Stable ID**: 07bc2cad
**Location**: L533:40–L544:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3790
@@ -529,20 +529,9 @@
     it("should initialize with empty state", () => {
       expect(draft.state).toEqual({});
     });
 
-    describe("Field operations", () => {
-      it.each([
-        ["question", "Draft question"],
-        ["answerType", "single_choice"],
-        ["explanation", "Draft explanation"],
-        ["creatorId", "draft-creator"],
-        ["solutionId", "draft-solution"],
-      ])("should set and get %s field", (field, value) => {
-        draft.update(field as keyof typeof validQuizData, value);
-        expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
-      });
-    });
+    describe("Field operations", () => {});
 
     it("should set multiple values at once", () => {
       const updates = {
         question: "Draft question",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
