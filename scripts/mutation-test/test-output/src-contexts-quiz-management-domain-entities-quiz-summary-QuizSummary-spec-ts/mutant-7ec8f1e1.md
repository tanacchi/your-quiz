# Mutant 7ec8f1e1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3454
**Stable ID**: 7ec8f1e1
**Location**: L165:65–L165:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3454
@@ -161,9 +161,9 @@
           ...invalidFields,
         };
 
         const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
+        const error = result._unsafeUnwrapErr({ withStackTrace: false });
         expect(
           error.issues.some((issue) => issue.message === expectedErrorMessage),
         ).toBe(true);
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
