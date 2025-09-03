# Mutant a2b35d0f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3726
**Stable ID**: a2b35d0f
**Location**: L458:47–L519:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3726
@@ -454,70 +454,9 @@
         });
       });
     });
 
-    describe("Multiple tag operations", () => {
-      describe("addTags success scenarios", () => {
-        it.each([
-          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
-          ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
-        ])(
-          "should add multiple tags to quiz with %s",
-          (_desc, initialTagIds, newTagIds) => {
-            const initialResult = QuizSummary.from({
-              ...(validQuizData as Record<string, unknown>),
-              tagIds: initialTagIds,
-            });
-            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-            const result = quiz.addTags(newTagIds);
-
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-            const finalTagIds = updatedQuiz.get("tagIds");
-            expect(finalTagIds).toEqual([...initialTagIds, ...newTagIds]);
-          },
-        );
-      });
-
-      it("should not add multiple tags with duplicates", () => {
-        const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-        const newTagIds = [
-          validTagIds[0] as TagId, // duplicate
-          TagId.parse("tag-3"),
-        ];
-
-        const result = quiz.addTags(newTagIds);
-
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) => issue.message.includes("already exist")),
-        ).toBe(true);
-      });
-
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
-    });
+    describe("Multiple tag operations", () => {});
   });
 
   describe("Draft Class", () => {
     let draft: InstanceType<typeof QuizSummary.Draft>;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
