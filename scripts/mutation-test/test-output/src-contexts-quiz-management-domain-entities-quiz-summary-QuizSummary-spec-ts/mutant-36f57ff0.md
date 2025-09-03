# Mutant 36f57ff0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3765
**Stable ID**: 36f57ff0
**Location**: L498:17–L506:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3765
@@ -494,17 +494,9 @@
         ).toBe(true);
       });
 
       describe("removeTags scenarios", () => {
-        it.each([
-          ["all tags", validTagIds, []],
-          [
-            "partial tags",
-            [TagId.parse(validTagIds[0])],
-            [TagId.parse(validTagIds[1])],
-          ],
-          ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
-        ])(
+        it.each([])(
           "should remove %s from quiz",
           (_desc, tagsToRemove, expectedRemaining) => {
             const initialResult = QuizSummary.from(validQuizData);
             const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
