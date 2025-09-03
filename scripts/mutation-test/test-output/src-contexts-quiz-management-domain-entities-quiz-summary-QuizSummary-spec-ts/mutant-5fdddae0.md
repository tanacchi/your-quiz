# Mutant 5fdddae0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3751
**Stable ID**: 5fdddae0
**Location**: L481:10–L481:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3751
@@ -477,9 +477,9 @@
           },
         );
       });
 
-      it("should not add multiple tags with duplicates", () => {
+      it("", () => {
         const initialResult = QuizSummary.from(validQuizData);
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
         const newTagIds = [
           validTagIds[0] as TagId, // duplicate
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
