# Mutant 96aaac5c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3570
**Stable ID**: 96aaac5c
**Location**: L298:46–L298:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3570
@@ -294,9 +294,9 @@
         .update("question", "New question")
         .andThen((q) => q.update("explanation", "New explanation"))
         .andThen((q) => q.update("answerType", "multiple_choice"));
 
-      const finalQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const finalQuiz = result._unsafeUnwrap({});
       expect(finalQuiz.get("question")).toBe("New question");
       expect(finalQuiz.get("explanation")).toBe("New explanation");
       expect(finalQuiz.get("answerType")).toBe("multiple_choice");
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
