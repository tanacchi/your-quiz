# Mutant 4ca16eb0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3554
**Stable ID**: 4ca16eb0
**Location**: L283:45–L283:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3554
@@ -279,9 +279,9 @@
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
       const result = quiz.update("question", ""); // empty string should fail
 
-      const error = result._unsafeUnwrapErr({ withStackTrace: true });
+      const error = result._unsafeUnwrapErr({});
       expect(error).toBeDefined();
     });
   });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
