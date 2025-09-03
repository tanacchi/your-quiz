# Mutant 4961e9f2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3690
**Stable ID**: 4961e9f2
**Location**: L407:48–L420:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3690
@@ -403,23 +403,10 @@
           );
         });
       });
 
-      it("should not add duplicate tag", () => {
-        const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-        const existingTagId = validTagIds[0] as TagId;
+      it("should not add duplicate tag", () => {});
 
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
       describe("removeTag scenarios", () => {
         it.each([
           ["first tag", 0, 1],
           ["second tag", 1, 1],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
