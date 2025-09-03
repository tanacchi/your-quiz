# Mutant 975ec9a9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3552
**Stable ID**: 975ec9a9
**Location**: L281:34–L281:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3552
@@ -277,9 +277,9 @@
     it("should validate when setting invalid values", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
 
-      const result = quiz.update("question", ""); // empty string should fail
+      const result = quiz.update("", ""); // empty string should fail
 
       const error = result._unsafeUnwrapErr({ withStackTrace: true });
       expect(error).toBeDefined();
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
