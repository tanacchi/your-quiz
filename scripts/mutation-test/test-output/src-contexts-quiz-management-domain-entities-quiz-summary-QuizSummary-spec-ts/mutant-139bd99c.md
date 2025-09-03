# Mutant 139bd99c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3659
**Stable ID**: 139bd99c
**Location**: L373:65–L373:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3659
@@ -369,9 +369,9 @@
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
         const result = quiz.approve("2023-12-02 12:00:00");
 
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
+        const error = result._unsafeUnwrapErr({ withStackTrace: false });
         expect(
           error.issues.some((issue) =>
             issue.message.includes(`${status} cannot be approved`),
           ),
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
