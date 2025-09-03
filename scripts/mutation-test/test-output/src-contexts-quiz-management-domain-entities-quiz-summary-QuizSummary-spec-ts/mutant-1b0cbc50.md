# Mutant 1b0cbc50 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3517
**Stable ID**: 1b0cbc50
**Location**: L241:48–L241:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3517
@@ -237,9 +237,9 @@
 
       const newQuestion = "What is JavaScript?";
       const result = quiz.update("question", newQuestion);
 
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const updatedQuiz = result._unsafeUnwrap({});
       expect(updatedQuiz.get("question")).toBe(newQuestion);
       expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
       expect(quiz).not.toBe(updatedQuiz); // different instances
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
