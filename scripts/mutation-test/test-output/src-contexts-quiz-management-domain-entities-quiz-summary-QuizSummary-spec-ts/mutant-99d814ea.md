# Mutant 99d814ea Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: MethodExpression
**Original ID**: 3455
**Stable ID**: 99d814ea
**Location**: L167:11–L167:79

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3455
@@ -163,9 +163,9 @@
 
         const result = QuizSummary.from(invalidData);
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
-          error.issues.some((issue) => issue.message === expectedErrorMessage),
+          error.issues.every(issue => issue.message === expectedErrorMessage),
         ).toBe(true);
       });
     });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
