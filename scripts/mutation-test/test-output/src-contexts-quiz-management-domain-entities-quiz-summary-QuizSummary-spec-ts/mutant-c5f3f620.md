# Mutant c5f3f620 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3548
**Stable ID**: c5f3f620
**Location**: L277:8–L277:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3548
@@ -273,9 +273,9 @@
         "Mutator updated explanation",
       );
     });
 
-    it("should validate when setting invalid values", () => {
+    it("", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
       const result = quiz.update("question", ""); // empty string should fail
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
