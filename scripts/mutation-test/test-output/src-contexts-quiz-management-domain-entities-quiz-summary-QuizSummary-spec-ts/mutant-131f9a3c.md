# Mutant 131f9a3c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3656
**Stable ID**: 131f9a3c
**Location**: L369:68–L369:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3656
@@ -365,9 +365,9 @@
           status,
           ...(approvedAt && { approvedAt }),
         };
         const initialResult = QuizSummary.from(testData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+        const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
 
         const result = quiz.approve("2023-12-02 12:00:00");
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
