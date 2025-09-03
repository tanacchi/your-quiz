# Mutant ef48db6a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3682
**Stable ID**: ef48db6a
**Location**: L394:70–L394:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3682
@@ -390,9 +390,9 @@
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
             tagIds: initialTagIds,
           });
-          const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+          const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
           const newTagId = TagId.parse("tag-new");
 
           const result = quiz.addTag(newTagId);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
