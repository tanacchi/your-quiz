# Mutant b10bf0cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3715
**Stable ID**: b10bf0cb
**Location**: L443:56–L454:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3715
@@ -439,20 +439,9 @@
             );
           },
         );
 
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
+        it("should not remove non-existing tag", () => {});
       });
     });
 
     describe("Multiple tag operations", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
