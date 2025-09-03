# Mutant 6b564e20 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3685
**Stable ID**: 6b564e20
**Location**: L399:70–L399:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3685
@@ -395,9 +395,9 @@
           const newTagId = TagId.parse("tag-new");
 
           const result = quiz.addTag(newTagId);
 
-          const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+          const updatedQuiz = result._unsafeUnwrap({ withStackTrace: false });
           expect(updatedQuiz.get("tagIds")).toContain(newTagId);
           expect(updatedQuiz.get("tagIds")).toHaveLength(
             initialTagIds.length + 1,
           );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
