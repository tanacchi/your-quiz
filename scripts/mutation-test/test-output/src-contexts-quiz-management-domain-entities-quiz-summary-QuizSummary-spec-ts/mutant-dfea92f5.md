# Mutant dfea92f5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3434
**Stable ID**: dfea92f5
**Location**: L139:35–L141:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3434
@@ -135,11 +135,9 @@
 
         const result = QuizSummary.from(invalidData);
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(error.issues).toContainEqual(
-          expect.objectContaining({
-            message: expect.stringContaining(expectedErrorMessage),
-          }),
+          expect.objectContaining({}),
         );
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
