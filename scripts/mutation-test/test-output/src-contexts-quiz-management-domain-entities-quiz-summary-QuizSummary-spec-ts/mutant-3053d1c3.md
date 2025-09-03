# Mutant 3053d1c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3743
**Stable ID**: 3053d1c3
**Location**: L465:48–L477:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3743
@@ -461,21 +461,9 @@
           ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
           ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
         ])(
           "should add multiple tags to quiz with %s",
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
+          (_desc, initialTagIds, newTagIds) => {},
         );
       });
 
       it("should not add multiple tags with duplicates", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
