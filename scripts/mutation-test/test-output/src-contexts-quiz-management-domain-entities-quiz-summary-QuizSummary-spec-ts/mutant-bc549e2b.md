# Mutant bc549e2b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3433
**Stable ID**: bc549e2b
**Location**: L137:65–L137:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3433
@@ -133,9 +133,9 @@
           ...invalidFields,
         };
 
         const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
+        const error = result._unsafeUnwrapErr({ withStackTrace: false });
         expect(error.issues).toContainEqual(
           expect.objectContaining({
             message: expect.stringContaining(expectedErrorMessage),
           }),
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
