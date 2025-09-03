# Mutant b0da6ed7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3778
**Stable ID**: b0da6ed7
**Location**: L508:55–L516:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3778
@@ -504,17 +504,9 @@
           ],
           ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
         ])(
           "should remove %s from quiz",
-          (_desc, tagsToRemove, expectedRemaining) => {
-            const initialResult = QuizSummary.from(validQuizData);
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-            const result = quiz.removeTags(tagsToRemove as TagId[]);
-
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-            expect(updatedQuiz.get("tagIds")).toEqual(expectedRemaining);
-          },
+          (_desc, tagsToRemove, expectedRemaining) => {},
         );
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
