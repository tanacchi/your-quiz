# Mutant fff76d2a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3555
**Stable ID**: fff76d2a
**Location**: L283:63–L283:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3555
@@ -279,9 +279,9 @@
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
       const result = quiz.update("question", ""); // empty string should fail
 
-      const error = result._unsafeUnwrapErr({ withStackTrace: true });
+      const error = result._unsafeUnwrapErr({ withStackTrace: false });
       expect(error).toBeDefined();
     });
   });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
