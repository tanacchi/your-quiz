# Mutant 2c3ad657 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3781
**Stable ID**: 2c3ad657
**Location**: L514:54–L514:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3781
@@ -510,9 +510,9 @@
             const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
             const result = quiz.removeTags(tagsToRemove as TagId[]);
 
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+            const updatedQuiz = result._unsafeUnwrap({});
             expect(updatedQuiz.get("tagIds")).toEqual(expectedRemaining);
           },
         );
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
