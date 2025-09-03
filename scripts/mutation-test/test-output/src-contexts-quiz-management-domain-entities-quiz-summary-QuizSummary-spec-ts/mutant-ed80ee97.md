# Mutant ed80ee97 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3728
**Stable ID**: ed80ee97
**Location**: L459:51–L479:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3728
@@ -455,30 +455,10 @@
       });
     });
 
     describe("Multiple tag operations", () => {
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
+      describe("addTags success scenarios", () => {});
 
-            const result = quiz.addTags(newTagIds);
-
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-            const finalTagIds = updatedQuiz.get("tagIds");
-            expect(finalTagIds).toEqual([...initialTagIds, ...newTagIds]);
-          },
-        );
-      });
-
       it("should not add multiple tags with duplicates", () => {
         const initialResult = QuizSummary.from(validQuizData);
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
         const newTagIds = [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
