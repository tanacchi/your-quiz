# Mutant df4ca0b3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3485
**Stable ID**: df4ca0b3
**Location**: L196:59–L196:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3485
@@ -192,9 +192,9 @@
   describe("Factory Methods", () => {
     it("should create QuizSummary from valid data", () => {
       const result = QuizSummary.from(validQuizData);
 
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+      const quiz = result._unsafeUnwrap({ withStackTrace: false });
       expect(quiz.get("question")).toBe("What is TypeScript?");
       expect(quiz.get("tagIds")).toEqual(validTagIds);
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
