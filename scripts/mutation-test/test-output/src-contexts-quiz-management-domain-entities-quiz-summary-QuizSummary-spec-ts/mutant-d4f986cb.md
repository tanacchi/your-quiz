# Mutant d4f986cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3628
**Stable ID**: d4f986cb
**Location**: L341:43–L341:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3628
@@ -337,9 +337,9 @@
           }),
         };
 
         const result = QuizSummary.from(testData);
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
+        const quiz = result._unsafeUnwrap({});
         expect(quiz.canBeDeleted()).toBe(expectedCanDelete);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
