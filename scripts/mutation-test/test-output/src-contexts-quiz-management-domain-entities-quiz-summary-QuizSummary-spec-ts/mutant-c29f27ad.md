# Mutant c29f27ad Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3937
**Stable ID**: c29f27ad
**Location**: L679:41–L679:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3937
@@ -675,9 +675,9 @@
     });
 
     it("should deep clone in toData", () => {
       const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+      const quiz = result._unsafeUnwrap({});
 
       const dto1 = quiz.toData();
       const dto2 = quiz.toData();
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
