# Mutant 3c0ac31a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3714
**Stable ID**: 3c0ac31a
**Location**: L443:12–L443:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3714
@@ -439,9 +439,9 @@
             );
           },
         );
 
-        it("should not remove non-existing tag", () => {
+        it("", () => {
           const initialResult = QuizSummary.from(validQuizData);
           const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
           const nonExistingTagId = TagId.parse("tag-999");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
