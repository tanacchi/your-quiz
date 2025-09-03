# Mutant 74b4ea23 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3764
**Stable ID**: 74b4ea23
**Location**: L497:46–L518:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3764
@@ -493,30 +493,9 @@
           error.issues.some((issue) => issue.message.includes("already exist")),
         ).toBe(true);
       });
 
-      describe("removeTags scenarios", () => {
-        it.each([
-          ["all tags", validTagIds, []],
-          [
-            "partial tags",
-            [TagId.parse(validTagIds[0])],
-            [TagId.parse(validTagIds[1])],
-          ],
-          ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
-        ])(
-          "should remove %s from quiz",
-          (_desc, tagsToRemove, expectedRemaining) => {
-            const initialResult = QuizSummary.from(validQuizData);
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-            const result = quiz.removeTags(tagsToRemove as TagId[]);
-
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-            expect(updatedQuiz.get("tagIds")).toEqual(expectedRemaining);
-          },
-        );
-      });
+      describe("removeTags scenarios", () => {});
     });
   });
 
   describe("Draft Class", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
