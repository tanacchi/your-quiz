# Mutant 3f88c9b4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3729
**Stable ID**: 3f88c9b4
**Location**: L460:17–L463:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3729
@@ -456,12 +456,9 @@
     });
 
     describe("Multiple tag operations", () => {
       describe("addTags success scenarios", () => {
-        it.each([
-          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
-          ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
-        ])(
+        it.each([])(
           "should add multiple tags to quiz with %s",
           (_desc, initialTagIds, newTagIds) => {
             const initialResult = QuizSummary.from({
               ...(validQuizData as Record<string, unknown>),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
