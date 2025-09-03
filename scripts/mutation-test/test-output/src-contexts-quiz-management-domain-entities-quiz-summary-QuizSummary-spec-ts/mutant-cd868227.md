# Mutant cd868227 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3681
**Stable ID**: cd868227
**Location**: L394:52–L394:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3681
@@ -390,9 +390,9 @@
           const initialResult = QuizSummary.from({
             ...(validQuizData as Record<string, unknown>),
             tagIds: initialTagIds,
           });
-          const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+          const quiz = initialResult._unsafeUnwrap({});
           const newTagId = TagId.parse("tag-new");
 
           const result = quiz.addTag(newTagId);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
