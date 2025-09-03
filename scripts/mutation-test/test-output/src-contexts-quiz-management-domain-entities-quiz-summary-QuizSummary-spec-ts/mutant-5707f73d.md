# Mutant 5707f73d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3513
**Stable ID**: 5707f73d
**Location**: L236:48–L236:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3513
@@ -232,9 +232,9 @@
     });
 
     it("should set single field and return new instance", () => {
       const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+      const quiz = initialResult._unsafeUnwrap({});
 
       const newQuestion = "What is JavaScript?";
       const result = quiz.update("question", newQuestion);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
