# Mutant a48e9e30 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3669
**Stable ID**: a48e9e30
**Location**: L385:50–L405:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3669
@@ -381,30 +381,10 @@
   });
 
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
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
+      describe("addTag success scenarios", () => {});
 
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
       it("should not add duplicate tag", () => {
         const initialResult = QuizSummary.from(validQuizData);
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
         const existingTagId = validTagIds[0] as TagId;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
