# Mutant 715ea6a4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3752
**Stable ID**: 715ea6a4
**Location**: L481:64–L495:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3752
@@ -477,24 +477,10 @@
           },
         );
       });
 
-      it("should not add multiple tags with duplicates", () => {
-        const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-        const newTagIds = [
-          validTagIds[0] as TagId, // duplicate
-          TagId.parse("tag-3"),
-        ];
+      it("should not add multiple tags with duplicates", () => {});
 
-        const result = quiz.addTags(newTagIds);
-
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) => issue.message.includes("already exist")),
-        ).toBe(true);
-      });
-
       describe("removeTags scenarios", () => {
         it.each([
           ["all tags", validTagIds, []],
           [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
