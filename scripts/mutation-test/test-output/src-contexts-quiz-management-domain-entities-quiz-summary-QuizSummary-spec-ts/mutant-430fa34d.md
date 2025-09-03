# Mutant 430fa34d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3634
**Stable ID**: 430fa34d
**Location**: L349:50–L349:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3634
@@ -345,9 +345,9 @@
 
     describe("approve method state transitions", () => {
       it("should approve pending quiz successfully", () => {
         const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+        const quiz = initialResult._unsafeUnwrap({});
         const approvedAt = "2023-12-01 12:00:00";
 
         const result = quiz.approve(approvedAt);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
