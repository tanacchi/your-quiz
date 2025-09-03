# Mutant d72a93b7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3757
**Stable ID**: d72a93b7
**Location**: L491:47–L491:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3757
@@ -487,9 +487,9 @@
         ];
 
         const result = quiz.addTags(newTagIds);
 
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
+        const error = result._unsafeUnwrapErr({});
         expect(
           error.issues.some((issue) => issue.message.includes("already exist")),
         ).toBe(true);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
