# Mutant d0d25745 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3782
**Stable ID**: d0d25745
**Location**: L514:72–L514:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3782
@@ -510,9 +510,9 @@
             const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
             const result = quiz.removeTags(tagsToRemove as TagId[]);
 
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: false });
             expect(updatedQuiz.get("tagIds")).toEqual(expectedRemaining);
           },
         );
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
