# Mutant c1b15a22 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3658
**Stable ID**: c1b15a22
**Location**: L373:47–L373:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3658
@@ -369,9 +369,9 @@
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
         const result = quiz.approve("2023-12-02 12:00:00");
 
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
+        const error = result._unsafeUnwrapErr({});
         expect(
           error.issues.some((issue) =>
             issue.message.includes(`${status} cannot be approved`),
           ),
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
