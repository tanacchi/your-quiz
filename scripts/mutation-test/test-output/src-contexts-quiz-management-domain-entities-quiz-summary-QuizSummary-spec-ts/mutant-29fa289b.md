# Mutant 29fa289b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3665
**Stable ID**: 29fa289b
**Location**: L383:36–L520:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3665
@@ -379,147 +379,10 @@
       });
     });
   });
 
-  describe("Tag Operations", () => {
-    describe("Single tag operations", () => {
-      describe("addTag success scenarios", () => {
-        it.each([
-          ["empty tag list", []],
-          ["existing tags", [TagId.parse("tag-other")]],
-        ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
-          const initialResult = QuizSummary.from({
-            ...(validQuizData as Record<string, unknown>),
-            tagIds: initialTagIds,
-          });
-          const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-          const newTagId = TagId.parse("tag-new");
+  describe("Tag Operations", () => {});
 
-          const result = quiz.addTag(newTagId);
-
-          const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-          expect(updatedQuiz.get("tagIds")).toContain(newTagId);
-          expect(updatedQuiz.get("tagIds")).toHaveLength(
-            initialTagIds.length + 1,
-          );
-        });
-      });
-
-      it("should not add duplicate tag", () => {
-        const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-        const existingTagId = validTagIds[0] as TagId;
-
-        const result = quiz.addTag(existingTagId);
-
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) =>
-            issue.message.includes("already exists"),
-          ),
-        ).toBe(true);
-      });
-
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
-    });
-
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
-  });
-
   describe("Draft Class", () => {
     let draft: InstanceType<typeof QuizSummary.Draft>;
 
     beforeEach(() => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
