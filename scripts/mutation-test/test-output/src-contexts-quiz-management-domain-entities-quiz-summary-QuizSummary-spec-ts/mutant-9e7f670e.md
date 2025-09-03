# Mutant 9e7f670e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3691
**Stable ID**: 9e7f670e
**Location**: L409:50–L409:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3691
@@ -405,9 +405,9 @@
       });
 
       it("should not add duplicate tag", () => {
         const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+        const quiz = initialResult._unsafeUnwrap({});
         const existingTagId = validTagIds[0] as TagId;
 
         const result = quiz.addTag(existingTagId);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
