# Mutant 5032f3dd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3700
**Stable ID**: 5032f3dd
**Location**: L422:45–L455:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3700
@@ -418,42 +418,9 @@
           ),
         ).toBe(true);
       });
 
-      describe("removeTag scenarios", () => {
-        it.each([
-          ["first tag", 0, 1],
-          ["second tag", 1, 1],
-        ])(
-          "should remove %s from quiz",
-          (_desc, tagIndex, expectedRemainingCount) => {
-            const initialResult = QuizSummary.from(validQuizData);
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-            const tagToRemove = validTagIds[tagIndex] as TagId;
-
-            const result = quiz.removeTag(tagToRemove);
-
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-            expect(updatedQuiz.get("tagIds")).not.toContain(tagToRemove);
-            expect(updatedQuiz.get("tagIds")).toHaveLength(
-              expectedRemainingCount,
-            );
-          },
-        );
-
-        it("should not remove non-existing tag", () => {
-          const initialResult = QuizSummary.from(validQuizData);
-          const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-          const nonExistingTagId = TagId.parse("tag-999");
-
-          const result = quiz.removeTag(nonExistingTagId);
-
-          const error = result._unsafeUnwrapErr({ withStackTrace: true });
-          expect(
-            error.issues.some((issue) => issue.message.includes("not found")),
-          ).toBe(true);
-        });
-      });
+      describe("removeTag scenarios", () => {});
     });
 
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
