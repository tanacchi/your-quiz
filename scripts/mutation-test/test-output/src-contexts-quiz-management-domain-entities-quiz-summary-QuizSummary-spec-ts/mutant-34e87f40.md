# Mutant 34e87f40 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: MethodExpression
**Original ID**: 3660
**Stable ID**: 34e87f40
**Location**: L375:11–L377:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3660
@@ -371,11 +371,9 @@
         const result = quiz.approve("2023-12-02 12:00:00");
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
-          error.issues.some((issue) =>
-            issue.message.includes(`${status} cannot be approved`),
-          ),
+          error.issues.every(issue => issue.message.includes(`${status} cannot be approved`)),
         ).toBe(true);
       });
     });
   });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
