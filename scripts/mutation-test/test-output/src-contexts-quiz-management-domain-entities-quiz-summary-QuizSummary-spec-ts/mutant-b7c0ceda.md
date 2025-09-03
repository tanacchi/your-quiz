# Mutant b7c0ceda Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3484
**Stable ID**: b7c0ceda
**Location**: L196:41–L196:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3484
@@ -192,9 +192,9 @@
   describe("Factory Methods", () => {
     it("should create QuizSummary from valid data", () => {
       const result = QuizSummary.from(validQuizData);
 
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+      const quiz = result._unsafeUnwrap({});
       expect(quiz.get("question")).toBe("What is TypeScript?");
       expect(quiz.get("tagIds")).toEqual(validTagIds);
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
