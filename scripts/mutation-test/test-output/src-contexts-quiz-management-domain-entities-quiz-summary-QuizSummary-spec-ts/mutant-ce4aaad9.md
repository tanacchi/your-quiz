# Mutant ce4aaad9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3524
**Stable ID**: ce4aaad9
**Location**: L249:48–L249:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3524
@@ -245,9 +245,9 @@
     });
 
     it("should update multiple fields with 'with' method", () => {
       const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+      const quiz = initialResult._unsafeUnwrap({});
 
       const result = quiz.with({
         question: "Updated question",
         explanation: "Updated explanation",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
