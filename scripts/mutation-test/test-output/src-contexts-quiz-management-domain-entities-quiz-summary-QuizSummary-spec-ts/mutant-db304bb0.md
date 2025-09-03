# Mutant db304bb0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3518
**Stable ID**: db304bb0
**Location**: L241:66–L241:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3518
@@ -237,9 +237,9 @@
 
       const newQuestion = "What is JavaScript?";
       const result = quiz.update("question", newQuestion);
 
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: false });
       expect(updatedQuiz.get("question")).toBe(newQuestion);
       expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
       expect(quiz).not.toBe(updatedQuiz); // different instances
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
