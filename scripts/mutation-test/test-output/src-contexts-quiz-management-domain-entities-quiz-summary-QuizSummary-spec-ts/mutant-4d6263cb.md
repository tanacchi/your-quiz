# Mutant 4d6263cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3603
**Stable ID**: 4d6263cb
**Location**: L321:43–L321:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3603
@@ -317,9 +317,9 @@
           }),
         };
 
         const result = QuizSummary.from(testData);
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
+        const quiz = result._unsafeUnwrap({});
         expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
