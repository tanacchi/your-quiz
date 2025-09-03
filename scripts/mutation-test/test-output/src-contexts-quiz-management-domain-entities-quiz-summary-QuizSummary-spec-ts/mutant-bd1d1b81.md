# Mutant bd1d1b81 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3747
**Stable ID**: bd1d1b81
**Location**: L474:54–L474:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3747
@@ -470,9 +470,9 @@
             const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
             const result = quiz.addTags(newTagIds);
 
-            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+            const updatedQuiz = result._unsafeUnwrap({});
             const finalTagIds = updatedQuiz.get("tagIds");
             expect(finalTagIds).toEqual([...initialTagIds, ...newTagIds]);
           },
         );
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
