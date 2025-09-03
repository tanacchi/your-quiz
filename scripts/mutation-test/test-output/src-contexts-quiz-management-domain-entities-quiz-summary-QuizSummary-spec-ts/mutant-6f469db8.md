# Mutant 6f469db8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3571
**Stable ID**: 6f469db8
**Location**: L298:64–L298:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3571
@@ -294,9 +294,9 @@
         .update("question", "New question")
         .andThen((q) => q.update("explanation", "New explanation"))
         .andThen((q) => q.update("answerType", "multiple_choice"));
 
-      const finalQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const finalQuiz = result._unsafeUnwrap({ withStackTrace: false });
       expect(finalQuiz.get("question")).toBe("New question");
       expect(finalQuiz.get("explanation")).toBe("New explanation");
       expect(finalQuiz.get("answerType")).toBe("multiple_choice");
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
